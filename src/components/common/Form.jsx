import React, { useState } from "react";
import TextInput from "../Fields/TextInput";
import PhoneInput from "../Fields/PhoneInput";
import RadioGroup from "../Fields/RadioGroup";
import SelectDropdown from "../Fields/SelectDropdown";
import CheckboxGroup from "../Fields/CheckboxGroup";

export default function Form({ fields = [] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lưu giá trị của các trường động, key là id của trường
  const [dynamicValues, setDynamicValues] = useState({});

  const handleFieldChange = (id, value) => {
    setDynamicValues((prev) => ({ ...prev, [id]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <TextInput
              label={field.label}
              value={dynamicValues[field.id] || ""}
              onChange={(val) => handleFieldChange(field.id, val)}
            />
          </div>
        );
      case "multiple":
        return (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <RadioGroup
              label={field.label}
              options={field.options.map((o) => ({ value: o, label: o }))}
              value={dynamicValues[field.id] || ""}
              onChange={(val) => handleFieldChange(field.id, val)}
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <SelectDropdown
              options={field.options.map((o) => ({ value: o, label: o }))}
              placeholder={field.label}
              value={dynamicValues[field.id] || ""}
              onChange={(val) => handleFieldChange(field.id, val)}
            />
          </div>
        );
      case "checkboxes":
        return (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <CheckboxGroup
              label={field.label}
              options={field.options.map((o) => ({ value: o, label: o }))}
              values={dynamicValues[field.id] || []}
              onChange={(val) => handleFieldChange(field.id, val)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form>
      <div style={{ marginBottom: "16px" }}>
        <TextInput
          placeholder="Nhập tên của bạn"
          value={name}
          onChange={setName}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          error={email && !/.+@.+\..+/.test(email) ? "Email không hợp lệ" : ""}
        />
      </div>
      {Array.isArray(fields) && fields.map((f) => renderField(f))}
    </form>
  );
}
