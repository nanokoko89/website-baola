import { useState, useMemo } from "react";
import classNames from "classnames/bind";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./VariantTable.module.scss";

const cx = classNames.bind(styles);

/**
 * Hàm Cartesian Product giữa 2 mảng.
 * Nếu một trong hai mảng rỗng, vẫn trả về từng phần tử của mảng kia.
 */
function cartesianProduct(arr1, arr2) {
  if (!arr1.length && !arr2.length) return [];
  if (!arr1.length) return arr2.map((v2) => [v2]);
  if (!arr2.length) return arr1.map((v1) => [v1]);
  const result = [];
  arr1.forEach((v1) => {
    arr2.forEach((v2) => {
      result.push([v1, v2]);
    });
  });
  return result;
}

/**
 * SortableTag: mỗi tùy chọn trong một nhóm
 *   - Có drag-handle "⋮⋮" để kéo-thả
 *   - Có nút "×" để xóa value
 */
const SortableTag = ({ groupIdx, value, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: value, // mỗi value trong cùng 1 nhóm phải unique
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} className={cx("value-tag")}>
      <span className={cx("drag-handle")} {...listeners} {...attributes}>
        ⋮⋮
      </span>
      <span className={cx("value-text")}>{value}</span>
      <button
        type="button"
        className={cx("btn-remove-value")}
        onClick={() => onRemove(groupIdx, value)}
      >
        ×
      </button>
    </div>
  );
};

const VariantTable = () => {
  /**
   * State groups: mảng các nhóm phân loại hiện có (tối đa 2 nhóm).
   * Mỗi phần tử dạng { id, name: "", values: [] }.
   * Khởi tạo ban đầu là [] để khi load trang, chưa có nhóm nào.
   */
  const [groups, setGroups] = useState([]);

  /**
   * inputGroupNames: lưu text đang gõ trong ô "Tên nhóm", tương ứng với mỗi group (max 14 ký tự).
   * inputTexts: lưu text đang gõ trong ô "Tùy chọn" (max 20 ký tự).
   */
  const [inputGroupNames, setInputGroupNames] = useState([]);
  const [inputTexts, setInputTexts] = useState([]);

  /**
   * Quản lý ảnh cho từng biến thể: { "Đỏ/XL": { file, preview }, ... }
   */
  const [imagesMap, setImagesMap] = useState({});

  /**
   * Dùng để DragOverlay hiển thị ghost khi kéo tag
   */
  const [activeTagId, setActiveTagId] = useState(null);

  // Sensors cho DnD
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  /**
   * 1. Thêm nhóm phân loại mới (nếu chưa có đủ 2 nhóm).
   */
  const addGroup = () => {
    if (groups.length >= 2) return;
    const newIdx = groups.length; // 0 hoặc 1
    const newId = `g${newIdx + 1}`;
    // Thêm group rỗng
    setGroups((prev) => [...prev, { id: newId, name: "", values: [] }]);
    // Đồng thời thêm giá trị mặc định cho inputGroupNames và inputTexts
    setInputGroupNames((prev) => [...prev, ""]);
    setInputTexts((prev) => [...prev, ""]);
  };

  /**
   * 2. Xóa cả nhóm phân loại (cả tên và values).
   *    Nếu xóa nhóm ở index idx, sẽ filter ra nhóm đó.
   *    Nhóm còn lại (nếu tồn tại) sẽ dời lên index trước.
   */
  const handleRemoveGroup = (idx) => {
    setGroups((prev) => prev.filter((_, i) => i !== idx));
    setInputGroupNames((prev) => prev.filter((_, i) => i !== idx));
    setInputTexts((prev) => prev.filter((_, i) => i !== idx));
    // Khi xóa, cũng nên reset ảnh vì key variant có thể thay đổi
    setImagesMap({});
  };

  /**
   * 3. Cập nhật text khi user gõ trong ô "Tên nhóm"
   *    + Chỉ cho phép tối đa 14 ký tự
   */
  const handleGroupNameChange = (idx, e) => {
    const text = e.target.value;
    if (text.length <= 14) {
      // Cập nhật inputGroupNames
      setInputGroupNames((prev) => {
        const copy = [...prev];
        copy[idx] = text;
        return copy;
      });
      // Đồng thời cập nhật luôn tên nhóm trong state groups
      setGroups((prev) =>
        prev.map((g, i) => (i === idx ? { ...g, name: text } : g))
      );
    }
  };

  /**
   * 4. Cập nhật text khi user gõ trong ô "Tùy chọn" (value)
   *    + Chỉ cho phép tối đa 20 ký tự
   */
  const handleInputTextChange = (idx, e) => {
    const text = e.target.value;
    if (text.length <= 20) {
      setInputTexts((prev) => {
        const copy = [...prev];
        copy[idx] = text;
        return copy;
      });
    }
  };

  /**
   * 5. Thêm value vào nhóm (khi nhấn Enter hoặc click "+")
   */
  const addValueToGroup = (idx) => {
    const val = inputTexts[idx].trim();
    if (!val) return;
    // Tránh trùng lặp trong cùng nhóm
    if (groups[idx].values.includes(val)) {
      // Reset input, trả về “0/20”
      setInputTexts((prev) => {
        const copy = [...prev];
        copy[idx] = "";
        return copy;
      });
      return;
    }
    // Thêm vào groups[idx].values
    setGroups((prev) =>
      prev.map((g, i) => (i === idx ? { ...g, values: [...g.values, val] } : g))
    );
    // Reset input, trả về “0/20”
    setInputTexts((prev) => {
      const copy = [...prev];
      copy[idx] = "";
      return copy;
    });
  };

  /**
   * 6. Khi user ấn Enter trong ô "Tùy chọn"
   */
  const handleAddValue = (idx, e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addValueToGroup(idx);
  };

  /**
   * 7. Xóa 1 value khỏi nhóm idx
   *    Sau khi xóa, xóa luôn các key ảnh cũ (imagesMap) để tránh key lỗi
   */
  const handleRemoveValue = (groupIdx, value) => {
    setGroups((prev) =>
      prev.map((g, i) =>
        i === groupIdx
          ? { ...g, values: g.values.filter((v) => v !== value) }
          : g
      )
    );
    setImagesMap({});
  };

  /**
   * 8. Bắt đầu kéo tag
   */
  const handleTagDragStart = (event) => {
    setActiveTagId(event.active.id);
  };

  /**
   * 9. Kết thúc kéo tag: hoán đổi vị trí value trong nhóm
   */
  const handleTagDragEnd = (groupIdx, event) => {
    const { active, over } = event;
    setActiveTagId(null);
    if (over && active.id !== over.id) {
      setGroups((prev) =>
        prev.map((g, i) => {
          if (i === groupIdx) {
            const oldIndex = g.values.findIndex((v) => v === active.id);
            const newIndex = g.values.findIndex((v) => v === over.id);
            const newOrder = arrayMove([...g.values], oldIndex, newIndex);
            return { ...g, values: newOrder };
          }
          return g;
        })
      );
    }
  };

  /**
   * 10. Sinh danh sách variants (=Cartesian Product của 2 mảng values)
   *     Nếu nhóm 2 rỗng, vẫn trả danh sách đơn giá trị nhóm 1
   */
  const variantsData = useMemo(() => {
    const vals1 = groups[0]?.values || [];
    const vals2 = groups[1]?.values || [];
    if (!vals1.length && !vals2.length) return [];
    const combos = cartesianProduct(vals1, vals2);
    return combos.map((combo) => {
      const key = combo.join("/");
      return {
        key,
        opt1: combo[0] || "",
        opt2: combo[1] || "",
      };
    });
  }, [groups]);

  /**
   * 11. Chọn ảnh cho từng variant (key)
   */
  const handleImageChange = (variantKey, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImagesMap((prev) => ({
      ...prev,
      [variantKey]: { file, preview },
    }));
  };

  /**
   * 12. Xóa ảnh của variant
   */
  const handleRemoveImage = (variantKey) => {
    setImagesMap((prev) => {
      const copy = { ...prev };
      delete copy[variantKey];
      return copy;
    });
  };

  /**
   * 13. Xóa row (variant) – chỉ xóa ảnh thôi, row vẫn giữ để sửa tiếp
   */
  // const handleRemoveVariantRow = (variantKey) => {
  //   setImagesMap((prev) => {
  //     const copy = { ...prev };
  //     delete copy[variantKey];
  //     return copy;
  //   });
  // };

  /**
   * 14. Áp dụng chung giá hoặc kho cho tất cả variants
   */
  const applyBulk = (role, value) => {
    const selector =
      role === "price"
        ? "input[data-role='price']"
        : "input[data-role='inventory']";
    document.querySelectorAll(selector).forEach((inp) => {
      inp.value = value;
    });
  };

  return (
    <div className={cx("wrapper")}>
      {/* ===== 0. Khi chưa có nhóm nào: hiển thị ô Giá chung và Kho chung (simple) ===== */}
      {groups.length === 0 && (
        <div className={cx("single-wrapper")}>
          <div className={cx("single-group")}>
            <label className={cx("label")}>
              <span className={cx("required")}>*</span> Giá
            </label>
            <div className={cx("input-wrapper")}>
              <span className={cx("currency-symbol")}>₫</span>
              <input
                type="number"
                className={cx("input-single")}
                placeholder="Nhập vào"
              />
            </div>
          </div>
          <div className={cx("single-group")}>
            <label className={cx("label")}>
              <span className={cx("required")}>*</span> Kho hàng
            </label>
            <input
              type="number"
              className={cx("input-single")}
              defaultValue={0}
            />
          </div>
        </div>
      )}

      {/* ===== 1. Phần nhập nhóm phân loại (tối đa 2 nhóm) ===== */}
      <div className={cx("groups-wrapper")}>
        <div className={cx("groups-header")}>
          <span className={cx("title")}>
            <span className={cx("dot")} /> Phân loại hàng (Nếu có)
          </span>
          {/* <span className={cx("note")}>(Chỉ tối đa 2 nhóm)</span> */}
        </div>

        {/* Nếu đã có nhóm tồn tại, hiển thị từng group-item */}
        {groups.map((group, idx) => (
          <div key={group.id} className={cx("group-item")}>
            {/* Nút X ở góc phải để xoá cả nhóm */}
            <button
              type="button"
              className={cx("btn-remove-group")}
              onClick={() => handleRemoveGroup(idx)}
            >
              ×
            </button>

            {/* Cột: Tên nhóm */}
            <div className={cx("left")}>
              <label className={cx("label")}>{`Nhóm ${idx + 1}`}</label>
              <div className={cx("group-name-wrapper")}>
                <input
                  type="text"
                  className={cx("input-group-name")}
                  placeholder="Ví dụ: Màu sắc, Kích cỡ..."
                  value={inputGroupNames[idx]}
                  onChange={(e) => handleGroupNameChange(idx, e)}
                  maxLength={14}
                />
                <span className={cx("char-count-group")}>
                  {inputGroupNames[idx].length}/14
                </span>
              </div>
              {!group.name.trim() && (
                <div className={cx("error-text")}>Không được để trống</div>
              )}
            </div>

            {/* Cột: Thêm/xóa tùy chọn */}
            <div className={cx("right-values")}>
              <label className={cx("label")}>Tùy chọn</label>
              <div className={cx("values-input-wrapper")}>
                <div className={cx("group-name-wrapper")}>
                  <input
                    type="text"
                    className={cx("input-value")}
                    placeholder="Nhập và ấn Enter"
                    maxLength={20}
                    value={inputTexts[idx]}
                    onChange={(e) => handleInputTextChange(idx, e)}
                    onKeyDown={(e) => handleAddValue(idx, e)}
                  />
                  <span className={cx("char-count")}>
                    {inputTexts[idx].length}/20
                  </span>
                </div>
                <button
                  type="button"
                  className={cx("btn-add-value")}
                  onClick={() => addValueToGroup(idx)}
                  title="Nhấn để thêm giá trị"
                >
                  +
                </button>
              </div>

              {/* Danh sách tag (tùy chọn), có thể kéo-thả và xóa */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleTagDragStart}
                onDragEnd={(ev) => handleTagDragEnd(idx, ev)}
              >
                <SortableContext
                  items={group.values}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className={cx("values-tag-list")}>
                    {group.values.map((val) => (
                      <SortableTag
                        key={val}
                        groupIdx={idx}
                        value={val}
                        onRemove={handleRemoveValue}
                      />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeTagId ? (
                    <div className={cx("value-tag", "drag-overlay")}>
                      <span className={cx("drag-handle")}>⋮⋮</span>
                      <span className={cx("value-text")}>{activeTagId}</span>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        ))}

        {/* Nút thêm nhóm (chỉ hiển thị nếu < 2 nhóm) */}
        {groups.length < 2 && (
          <button
            type="button"
            className={cx("btn-add-group")}
            onClick={addGroup}
          >
            + Thêm nhóm phân loại
          </button>
        )}
      </div>

      {/* ===== 2. Nếu đã có biến thể, hiển thị phần Giá chung / Kho chung và bảng biến thể ===== */}
      {variantsData.length > 0 && (
        <>
          {/* Áp dụng chung Giá / Kho cho tất cả variants */}
          <div className={cx("bulk-wrapper")}>
            <div className={cx("bulk-group")}>
              <label className={cx("bulk-label")}>Giá chung:</label>
              <div className={cx("bulk-input-wrapper")}>
                <span className={cx("currency-symbol")}>₫</span>
                <input
                  type="number"
                  className={cx("input-bulk")}
                  placeholder="Nhập giá"
                  onChange={(e) => applyBulk("price", e.target.value)}
                />
              </div>
            </div>

            <div className={cx("bulk-group")}>
              <label className={cx("bulk-label")}>Kho chung:</label>
              <div className={cx("bulk-input-wrapper")}>
                <input
                  type="number"
                  className={cx("input-bulk")}
                  placeholder="Nhập kho"
                  onChange={(e) => applyBulk("inventory", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bảng hiển thị các biến thể (variants) */}
          <div className={cx("table-wrapper")}>
            <table className={cx("variant-table")}>
              <thead>
                <tr>
                  <th className={cx("th-image")}>Ảnh</th>

                  {/* Cột Nhóm 1 */}
                  <th className={cx("th-opt1")}>
                    {groups[0]?.name.trim() ? groups[0].name : "Nhóm 1"}
                  </th>

                  {/* Cột Nhóm 2 (nếu có) */}
                  {groups.length > 1 && (
                    <th className={cx("th-opt2")}>
                      {groups[1]?.name.trim() ? groups[1].name : "Nhóm 2"}
                    </th>
                  )}

                  <th className={cx("th-price")}>* Giá</th>
                  <th className={cx("th-inventory")}>* Kho hàng</th>
                  <th className={cx("th-sku")}>SKU phân loại</th>
                </tr>
              </thead>

              <tbody>
                {variantsData.map((vd) => (
                  <tr key={vd.key}>
                    {/* Ảnh */}
                    <td className={cx("td-image")}>
                      {imagesMap[vd.key]?.preview ? (
                        <div className={cx("thumb-single")}>
                          <img
                            src={imagesMap[vd.key].preview}
                            alt="Thumb"
                            className={cx("thumb-single-img")}
                          />
                          <button
                            type="button"
                            className={cx("btn-remove-thumb")}
                            onClick={() => handleRemoveImage(vd.key)}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div
                          className={cx("add-image-box")}
                          onClick={() => {
                            const inputEl = document.getElementById(
                              `file-input-${vd.key}`
                            );
                            inputEl && inputEl.click();
                          }}
                        >
                          <span className={cx("plus-icon")}>＋</span>
                          <span className={cx("add-text-small")}>Thêm ảnh</span>
                          <input
                            type="file"
                            id={`file-input-${vd.key}`}
                            accept="image/*"
                            className={cx("input-file-hidden")}
                            onChange={(e) => handleImageChange(vd.key, e)}
                          />
                        </div>
                      )}
                    </td>

                    {/* Tên tùy chọn Nhóm 1 */}
                    <td className={cx("td-opt1")}>{vd.opt1}</td>

                    {/* Tên tùy chọn Nhóm 2 (nếu có) */}
                    {groups.length > 1 && (
                      <td className={cx("td-opt2")}>{vd.opt2}</td>
                    )}

                    {/* Giá */}
                    <td className={cx("td-price")}>
                      <div className={cx("input-wrapper")}>
                        <input
                          type="text"
                          className={cx("input-cell")}
                          data-role="price"
                          placeholder="Nhập vào"
                        />
                        <span className={cx("currency")}>₫</span>
                      </div>
                    </td>

                    {/* Kho */}
                    <td className={cx("td-inventory")}>
                      <input
                        type="text"
                        className={cx("input-cell")}
                        data-role="inventory"
                        defaultValue={0}
                      />
                    </td>

                    {/* SKU */}
                    <td className={cx("td-sku")}>
                      <input
                        type="text"
                        className={cx("input-cell")}
                        placeholder="Nhập SKU"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ===== 3. Nếu chưa có variant nào (nhưng đã thêm ít nhất 1 nhóm) ===== */}
      {variantsData.length === 0 && groups.length > 0 && (
        <div className={cx("no-variant")}>
          Vui lòng nhập ít nhất một tùy chọn ở Nhóm 1 để tạo biến thể
        </div>
      )}
    </div>
  );
};

export default VariantTable;
