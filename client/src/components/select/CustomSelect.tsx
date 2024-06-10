import React, { useState } from 'react';
import { Select } from 'rizzui';

interface SelectProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options: any[]; // You may need to define a type/interface for your options
}

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, placeholder, options }) => {
  const [selectedValue, setSelectedValue] = useState(value); // Sử dụng state để lưu trữ giá trị đã chọn

  const handleSelectChange = (selectedValue: any) => {
    setSelectedValue(selectedValue); // Cập nhật giá trị đã chọn
    if (onChange) onChange(selectedValue); // Gọi hàm onChange nếu được cung cấp
  };
  return (
    <Select
      options={options.map((option) => ({ value: option }))}
      value={selectedValue}
      onChange={handleSelectChange}
      placeholder={placeholder}
      className="col-span-full"
      getOptionValue={(option: { value: any }) => option.value}
      getOptionDisplayValue={(option: { value: any }) => option.value}
      displayValue={(selected: any) => selected.value}
      dropdownClassName="!z-[1]"
      inPortal={false}
    />
  );
};

export default CustomSelect;
