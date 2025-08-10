// src/components/PrivacyPolicy/PrivacyPolicy.jsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./PrivacyPolicy.module.scss";

const cx = classNames.bind(styles);

export default function PrivacyPolicy() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1 className={cx("title")}>CHÍNH SÁCH BẢO MẬT NỀN TẢNG BAO LA</h1>
        <p className={cx("lastRevision")}>
          Ngày sửa đổi cuối cùng: 26 tháng 6, 2025
        </p>

        <p className={cx("paragraph")}>
          Chào mừng bạn đến với trang web ("Trang") của Find Community, Inc.,
          hoạt động dưới tên thương mại Bao La ("Bao La", "chúng tôi", "của
          chúng tôi"). Bao La là một nền tảng dành cho những Nhà sáng tạo nội
          dung ("Nhà sáng tạo") để kiếm tiền từ hàng hoá số, nội dung và dịch vụ
          ("Nội dung Nhà sáng tạo"), đồng thời cho phép người hâm mộ và người
          theo dõi của Nhà sáng tạo ("Khách hàng") mua các Nội dung đó thông qua
          nền tảng Bao La (gọi chung là "Dịch vụ").
        </p>

        <p className={cx("paragraph")}>
          Chính sách bảo mật này giải thích thông tin cá nhân mà chúng tôi thu
          thập từ Nhà sáng tạo và Khách hàng (gọi chung là "bạn") thông qua
          Trang web, ứng dụng di động và Dịch vụ, cách chúng tôi sử dụng và chia
          sẻ thông tin đó, cũng như các lựa chọn và quyền lợi của bạn liên quan
          đến các thực tiễn thông tin của chúng tôi.
        </p>

        <p className={cx("paragraph")}>
          Find Community, Inc. là bên kiểm soát thông tin cá nhân của bạn theo
          luật bảo vệ dữ liệu của Khu vực Kinh tế Châu Âu và Vương quốc Anh. Nếu
          bạn có câu hỏi hoặc ý kiến về Chính sách này, vui lòng gửi yêu cầu đến
          friends@stanwith.me.
        </p>

        <h2 className={cx("sectionTitle")}>
          1. THÔNG TIN CÁ NHÂN CHÚNG TÔI THU THẬP
        </h2>

        <p className={cx("paragraph")}>
          Thông tin cá nhân bạn cung cấp: Chúng tôi thu thập các loại thông tin
          cá nhân sau khi bạn sử dụng hoặc tương tác với Dịch vụ:
        </p>
        <ul className={cx("list")}>
          <li className={cx("listItem")}>
            <strong>Thông tin tài khoản và hồ sơ:</strong> Chúng tôi thu thập
            tên, địa chỉ email, số điện thoại, địa chỉ, ảnh đại diện và, đối với
            Nhà sáng tạo, các thông tin bổ sung bạn cung cấp khi tạo tài khoản
            (như tên người dùng và mật khẩu). Khi bạn liên hệ với chúng tôi, bạn
            cũng cung cấp nội dung trao đổi.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin tài chính:</strong> Trình xử lý thanh toán của
            chúng tôi là Stripe, Inc. ("Stripe") thu thập thông tin tài chính
            cần thiết để xử lý thanh toán qua Dịch vụ. Theo đó, ngoài Chính sách
            này và Điều khoản Dịch vụ của chúng tôi, dữ liệu tài chính của bạn
            còn được xử lý theo thỏa thuận dịch vụ và chính sách bảo mật của
            Stripe.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin liên lạc:</strong> Chúng tôi có thể thu thập thông
            tin khi bạn liên hệ với chúng tôi về câu hỏi hoặc thắc mắc và khi
            bạn tự nguyện phản hồi bảng câu hỏi, khảo sát hoặc yêu cầu nghiên
            cứu thị trường để cung cấp ý kiến và phản hồi. Việc cung cấp thông
            tin liên lạc là tùy chọn.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin thương mại:</strong> Chúng tôi có thể lưu trữ lịch
            sử Nội dung Nhà sáng tạo mà bạn duyệt, cung cấp hoặc mua qua Dịch
            vụ.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin nhân khẩu học:</strong> Chúng tôi thu thập tuổi và
            giới tính của bạn.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin mạng xã hội:</strong> Chúng tôi có trang trên
            Instagram, Facebook, YouTube và TikTok ("Các trang mạng xã hội").
            Khi bạn tương tác với các trang này, chúng tôi thu thập thông tin
            bạn cung cấp, như chi tiết liên hệ, ảnh hồ sơ, danh sách bạn bè, bài
            viết, reels và stories. Ngoài ra, các nền tảng mạng xã hội có thể
            cung cấp cho chúng tôi dữ liệu tổng hợp và phân tích sử dụng.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin khác:</strong> Các thông tin không được liệt kê cụ
            thể ở trên nhưng được sử dụng theo mô tả trong Chính sách này hoặc
            được thông báo tại thời điểm thu thập.
          </li>
        </ul>

        <p className={cx("paragraph")}>
          Thông tin hoạt động Internet: Khi bạn truy cập, sử dụng và tương tác
          với Dịch vụ, chúng tôi có thể nhận được thông tin về lượt truy cập,
          cách sử dụng và tương tác của bạn. Ví dụ: số người truy cập, giờ cao
          điểm, trang được truy cập, tên miền nguồn (ví dụ: google.com,
          yahoo.com), trình duyệt (ví dụ: Chrome, Firefox, Internet Explorer),
          thông tin vị trí đại khái và mô hình điều hướng. Cụ thể, chúng tôi tự
          động ghi nhận:
        </p>
        <ul className={cx("list")}>
          <li className={cx("listItem")}>
            <strong>Thông tin nhật ký:</strong> Dữ liệu trình duyệt gửi tự động
            khi bạn truy cập Trang, bao gồm địa chỉ IP, loại trình duyệt và cài
            đặt, ngày giờ yêu cầu và cách bạn tương tác.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin cookie:</strong> Vui lòng tham khảo Chính sách
            Cookie để biết cách chúng tôi sử dụng cookie.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin thiết bị:</strong> Tên thiết bị, hệ điều hành và
            trình duyệt. Thông tin phụ thuộc vào loại thiết bị và cài đặt.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin sử dụng:</strong> Cách bạn sử dụng Dịch vụ, như
            loại nội dung xem hoặc tương tác, tính năng sử dụng, hành động thực
            hiện, thời gian, tần suất và độ dài hoạt động.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin vị trí:</strong> Chúng tôi có thể thu thập vị trí
            qua địa chỉ IP và điểm truy cập Wi-Fi gần thiết bị. Trên thiết bị di
            động, chúng tôi có thể yêu cầu phép thu thập vị trí. Một số tính
            năng chỉ hoạt động khi cho phép chia sẻ vị trí.
          </li>
          <li className={cx("listItem")}>
            <strong>Thông tin mở/nhấp email:</strong> Chúng tôi sử dụng pixel
            trong email để thu thập địa chỉ email, IP và ngày giờ bạn mở hoặc
            nhấp liên kết trong email.
          </li>
        </ul>

        <h2 className={cx("sectionTitle")}>
          2. CÁCH CHÚNG TÔI SỬ DỤNG THÔNG TIN CÁ NHÂN
        </h2>
        <p className={cx("paragraph")}>
          Chúng tôi sử dụng thông tin cá nhân cho các mục đích sau:
        </p>
        <ul className={cx("list")}>
          <li className={cx("listItem")}>
            <strong>Vận hành và cung cấp Dịch vụ:</strong> Thực hiện nghĩa vụ
            hợp đồng và lợi ích hợp pháp, bao gồm:
            <ul className={cx("sublist")}>
              <li className={cx("sublistItem")}>
                Cung cấp, vận hành, bảo trì và bảo mật Dịch vụ;
              </li>
              <li className={cx("sublistItem")}>
                Hỗ trợ kỹ thuật và khắc phục sự cố;
              </li>
              <li className={cx("sublistItem")}>
                Gửi cập nhật về vấn đề quản trị như thay đổi Điều khoản hoặc
                Chính sách.
              </li>
            </ul>
          </li>
          <li className={cx("listItem")}>
            <strong>Cải thiện và bảo vệ Dịch vụ:</strong> Vì lợi ích hợp pháp,
            bao gồm:
            <ul className={cx("sublist")}>
              <li className={cx("sublistItem")}>
                Cá nhân hoá trải nghiệm và mối quan hệ với bạn;
              </li>
              <li className={cx("sublistItem")}>Bảo vệ an ninh Dịch vụ;</li>
              <li className={cx("sublistItem")}>
                Phòng chống gian lận, mối đe doạ bảo mật hoặc hoạt động độc hại.
              </li>
            </ul>
          </li>
          <li className={cx("listItem")}>
            <strong>Nghiên cứu và phát triển:</strong> Vì lợi ích hợp pháp, bao
            gồm tạo và sử dụng dữ liệu ẩn danh, khử danh tính để phân tích và
            chia sẻ với bên thứ ba nhằm cải thiện Dịch vụ và kinh doanh.
          </li>
          <li className={cx("listItem")}>
            <strong>Tuân thủ pháp lý và bảo vệ pháp lý:</strong> Thực hiện nghĩa
            vụ pháp lý và lợi ích hợp pháp,bao gồm:
            <ul className={cx("sublist")}>
              <li className={cx("sublistItem")}>
                Tuân thủ luật, trát đòi hầu toà và yêu cầu từ cơ quan chức năng;
              </li>
              <li className={cx("sublistItem")}>
                Bảo vệ quyền lợi, quyền riêng tư và an toàn của chúng tôi, bạn
                hoặc người khác;
              </li>
              <li className={cx("sublistItem")}>
                Kiểm toán tuân thủ hợp đồng, chính sách nội bộ;
              </li>
              <li className={cx("sublistItem")}>
                Thực thi Điều khoản Dịch vụ;
              </li>
              <li className={cx("sublistItem")}>
                Quản lý an ninh, ngăn chặn và điều tra gian lận hoặc tấn công
                mạng.
              </li>
            </ul>
          </li>
          <li className={cx("listItem")}>
            <strong>Tiếp thị:</strong> Chúng tôi, nhà cung cấp dịch vụ và đối
            tác quảng cáo có thể liên hệ bạn về sản phẩm/dịch vụ qua:
            <ul className={cx("sublist")}>
              <li className={cx("sublistItem")}>
                Tiếp thị trực tiếp: Gửi ưu đãi đặc biệt qua email, tin nhắn. Bạn
                có thể từ chối bằng hướng dẫn hủy trong thông điệp hoặc qua cài
                đặt tài khoản.
              </li>
              <li className={cx("sublistItem")}>
                Quảng cáo theo sở thích: Hợp tác với Google, Meta… để hiển thị
                quảng cáo phù hợp. Xem Chính sách Cookie để biết cách quản lý.
              </li>
            </ul>
          </li>
          <li className={cx("listItem")}>
            <strong>Hỗ trợ giao dịch doanh nghiệp:</strong> Sử dụng thông tin
            khi có sáp nhập, mua bán, chuyển nhượng hoặc phá sản.
          </li>
        </ul>

        <h2 className={cx("sectionTitle")}>3. CHIA SẺ VÀ CÔNG BỐ THÔNG TIN</h2>
        <p className={cx("paragraph")}>
          Trong một số trường hợp, trừ khi luật yêu cầu, chúng tôi chia sẻ thông
          tin với:
        </p>
        <ul className={cx("list")}>
          <li className={cx("listItem")}>
            <strong>Nhà cung cấp dịch vụ và đối tác:</strong> Cloud, hosting,
            CRM, email, phân tích, thanh toán, quảng cáo,…) thực hiện chức năng
            theo chỉ đạo của chúng tôi.
          </li>
          <li className={cx("listItem")}>
            <strong>Tư vấn chuyên môn:</strong> Luật sư, kiểm toán viên khi cần.
          </li>
          <li className={cx("listItem")}>
            <strong>Trong giao dịch doanh nghiệp:</strong> Chia sẻ trong quá
            trình sáp nhập, mua bán hoặc chuyển nhượng.
          </li>
          <li className={cx("listItem")}>
            <strong>Yêu cầu pháp lý:</strong> Tuân thủ luật, yêu cầu cơ quan
            chức năng, bảo vệ an ninh và quyền lợi.
          </li>
          <li className={cx("listItem")}>
            <strong>Dữ liệu tổng hợp/ẩn danh:</strong> Thống kê chung, không cá
            nhân hoá, chia sẻ cho đối tác.
          </li>
        </ul>

        <h2 className={cx("sectionTitle")}>
          4. THÔNG TIN BẠN CHIA SẺ VỚI NGƯỜI KHÁC
        </h2>
        <p className={cx("paragraph")}>
          Khi bạn tương tác hoặc mua Nội dung Nhà sáng tạo, thông tin bạn cung
          cấp sẽ được Nhà sáng tạo và bên liên quan nhận và sử dụng theo chính
          sách riêng của họ. Chúng tôi không chịu trách nhiệm cho các chính sách
          của bên thứ ba.
        </p>

        <h2 className={cx("sectionTitle")}>5. QUYỀN LỢI CỦA BẠN</h2>
        <p className={cx("paragraph")}>Tùy theo luật áp dụng, bạn có quyền:</p>
        <ul className={cx("list")}>
          <li className={cx("listItem")}>
            Truy cập, chỉnh sửa, xóa hoặc giới hạn xử lý thông tin cá nhân.
          </li>
          <li className={cx("listItem")}>
            Nhận dữ liệu ở định dạng máy đọc được hoặc chuyển cho đơn vị khác.
          </li>
          <li className={cx("listItem")}>
            Từ chối chia sẻ cho quảng cáo theo sở thích hoặc bán dữ liệu.
          </li>
          <li className={cx("listItem")}>
            Kháng nghị hoặc rút lại đồng ý xử lý thông tin.
          </li>
        </ul>
        <p className={cx("paragraph")}>
          Để thực hiện quyền lợi, liên hệ friends@stanwith.me. Chúng tôi có thể
          yêu cầu xác minh danh tính trước khi xử lý.
        </p>

        <h2 className={cx("sectionTitle")}>6. TRẺ EM</h2>
        <p className={cx("paragraph")}>
          Dịch vụ không dành cho trẻ dưới 16 tuổi. Nếu phát hiện thu thập thông
          tin của trẻ dưới 16 tuổi, vui lòng thông báo để chúng tôi xoá.
        </p>

        <h2 className={cx("sectionTitle")}>7. LIÊN KẾT ĐẾN WEBSITE KHÁC</h2>
        <p className={cx("paragraph")}>
          Trang có thể chứa liên kết đến các trang web bên thứ ba không do Bao
          La kiểm soát. Chúng tôi không chịu trách nhiệm cho chính sách bảo mật
          của các trang đó.
        </p>

        <h2 className={cx("sectionTitle")}>8. BẢO MẬT</h2>
        <p className={cx("paragraph")}>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ
          thông tin cá nhân, nhưng không thể đảm bảo tuyệt đối an toàn trên
          Internet.
        </p>

        <h2 className={cx("sectionTitle")}>9. NGƯỜI DÙNG QUỐC TẾ</h2>
        <p className={cx("paragraph")}>
          Bao La có trụ sở tại Việt Nam. Nếu bạn ở ngoài Việt Nam, lưu ý quy
          định bảo vệ dữ liệu có thể khác. Chúng tôi sẽ áp dụng biện pháp bảo vệ
          phù hợp khi chuyển dữ liệu quốc tế.
        </p>

        <h2 className={cx("sectionTitle")}>10. THAY ĐỔI CHÍNH SÁCH</h2>
        <p className={cx("paragraph")}>
          Chính sách này có thể được cập nhật. Khi tiếp tục sử dụng Dịch vụ sau
          khi cập nhật, bạn đồng ý với phiên bản mới.
        </p>

        <h2 className={cx("sectionTitle")}>11. LIÊN HỆ</h2>
        <p className={cx("paragraph")}>
          Nếu có câu hỏi về Chính sách bảo mật, liên hệ: 99 Nguyễn Văn Lộc, Quận
          Hà Đông, Thành phố Hà Nội, Việt Nam hoặc email friends@baola.store.
        </p>
      </div>
    </div>
  );
}
