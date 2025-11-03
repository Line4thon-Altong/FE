import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

interface AlertProps {
  title: string;
  description: string;
  alertType?: "delete" | "alert";
  onClose?: () => void;
}

export function Alert({
  title,
  description,
  alertType = "delete",
  onClose,
}: AlertProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <AlertBackdrop onClick={handleBackdropClick}>
      <AlertWrapper onClick={(e) => e.stopPropagation()}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <AlertButtonContainer>
          <CancelButton $alertType={alertType} onClick={onClose}>
            취소
          </CancelButton>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </AlertButtonContainer>
      </AlertWrapper>
    </AlertBackdrop>
  );
}
const AlertBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: ${theme.effects.effect1};
  gap: 7px;
`;

const AlertTitle = styled.div`
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  color: ${theme.colors.gray1};
`;

const AlertDescription = styled.div`
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  color: ${theme.colors.gray2};
  width: 245px;
`;

const AlertButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button<{ $alertType?: "alert" | "delete" }>`
  background-color: ${theme.colors.gray5};
  color: ${theme.colors.gray2};
  padding: 6px 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};

  ${({ $alertType }) =>
    $alertType === "alert" &&
    css`
      display: none;
    `}
`;

const ConfirmButton = styled.button`
  background-color: ${theme.colors.main};
  color: ${theme.colors.white};
  padding: 6px 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
`;
