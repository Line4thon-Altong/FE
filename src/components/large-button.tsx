import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

interface LargeButtonProps {
  text: string;
  textType?: "login" | "others";
  disabled?: boolean;
  onClick?: () => void;
}

export function LargeButton({
  text,
  textType = "others",
  disabled = false,
  onClick,
}: LargeButtonProps) {
  return (
    <ButtonWrapper $textType={textType} disabled={disabled} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<{
  $textType?: "login" | "others";
  disabled?: boolean;
}>`
  width: 100%;
  padding: 13.5px 0;
  background-color: ${theme.colors.main};
  color: ${theme.colors.white};
  border-radius: 20px;
  border: none;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.main_deactivation};
      cursor: not-allowed;
    `}

  ${({ $textType = "others" }) =>
    $textType === "login"
      ? css`
          font-size: ${theme.texts.body2.fontSize};
          font-weight: ${theme.texts.body2.fontWeight};
          line-height: ${theme.texts.body2.lineHeight};
        `
      : css`
          font-size: ${theme.texts.h3.fontSize};
          font-weight: ${theme.texts.h3.fontWeight};
          line-height: ${theme.texts.h3.lineHeight};
        `}
`;
