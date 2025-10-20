import styled from "styled-components";
import { theme } from "@/styles/theme";
import EyesOffIcon from "@/assets/icons/ic_eyes-off";
import EyesOnIcon from "@/assets/icons/ic_eyes-on";
import { useState, type ChangeEventHandler } from "react";

interface InputProps {
  placeholder: string;
  type?: "text" | "password";
  title?: string;
  value?: string;
  errorText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Input({
  placeholder,
  type = "text",
  title,
  value,
  errorText,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <FieldWrapper>
      {title && <Title>{title}</Title>}
      <InputWrapper>
        <InputField
          placeholder={placeholder}
          type={inputType}
          value={value ?? undefined}
          onChange={onChange}
        />
        {type === "password" && (
          <ToggleButton
            type="button"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyesOnIcon /> : <EyesOffIcon />}
          </ToggleButton>
        )}
      </InputWrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Title = styled.div`
  font-size: ${theme.texts.h4.fontSize};
  font-weight: ${theme.texts.h4.fontWeight};
  line-height: ${theme.texts.h4.lineHeight};
  color: ${theme.colors.gray2};
  margin-bottom: 2px;
  margin-left: 15px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  border: 1px solid ${theme.colors.gray4};
  border-radius: 20px;
  width: 100%;
  padding: 15px 26px;
  color: ${theme.colors.gray2};
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray4};
    font-size: ${theme.texts.body3.fontSize};
    font-weight: ${theme.texts.body3.fontWeight};
    line-height: ${theme.texts.body3.lineHeight};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`;

const ErrorText = styled.div`
  position: absolute;
  right: 7px;
  color: ${theme.colors.negative};
  font-size: ${theme.texts.body7.fontSize};
  font-weight: ${theme.texts.body7.fontWeight};
  line-height: ${theme.texts.body7.lineHeight};
`;
