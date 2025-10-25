import styled from "styled-components";
import { theme } from "@/styles/theme";
import type { ChangeEventHandler } from "react";
import SearchIcon from "@/assets/icons/ic_search";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <InputWrapper>
      <SearchIcon width={16} height={16} />
      <InputField
        placeholder={placeholder}
        type="text"
        value={value ?? undefined}
        onChange={onChange}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 27px;
  width: 100%;
  padding: 15px 32px;
  background-color: ${theme.colors.gray6};
  gap: 9px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const InputField = styled.input`
  color: ${theme.colors.gray2};
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  outline: none;
  border: none;
  background: transparent;
  width: 100%;

  &::placeholder {
    color: ${theme.colors.gray2};
    font-size: ${theme.texts.body3.fontSize};
    font-weight: ${theme.texts.body3.fontWeight};
    line-height: ${theme.texts.body3.lineHeight};
  }
`;
