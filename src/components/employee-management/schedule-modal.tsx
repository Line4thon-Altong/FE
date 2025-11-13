import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface ScheduleModalProps {
  name: string;
  id: string;
  onClose?: () => void;
  onConfirm?: (selectedDays: string[]) => void;
}

export function ScheduleModal({
  name,
  id,
  onClose,
  onConfirm,
}: ScheduleModalProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleDayClick = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        // 이미 선택된 요일이면 제거
        return prev.filter((d) => d !== day);
      } else {
        // 선택되지 않은 요일이면 추가
        return [...prev, day];
      }
    });
  };

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <AlertBackdrop onClick={handleBackdropClick}>
      <AlertWrapper onClick={(e) => e.stopPropagation()}>
        <div>
          <AlertTitle>{name}</AlertTitle>
          <AlertDescription>{id}</AlertDescription>
        </div>
        <DaysRow>
          {days.map((day) => (
            <DaysCell
              key={day}
              $selected={selectedDays.includes(day)}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </DaysCell>
          ))}
        </DaysRow>
        <AlertButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton
            onClick={() => {
              if (onConfirm) onConfirm?.(selectedDays);
              else if (onClose) onClose();
            }}
          >
            확인
          </ConfirmButton>
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
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  line-height: ${theme.texts.subtitle1.lineHeight};
  color: ${theme.colors.gray1};
`;

const AlertDescription = styled.div`
  font-size: ${theme.texts.subtitle2.fontSize};
  font-weight: ${theme.texts.subtitle2.fontWeight};
  line-height: ${theme.texts.subtitle2.lineHeight};
  color: ${theme.colors.gray2};
  width: 245px;
`;

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  color: ${theme.colors.white};
  font-size: ${theme.texts.body5.fontSize};
  line-height: ${theme.texts.body5.lineHeight};
  font-weight: ${theme.texts.body5.fontWeight};
`;

const DaysCell = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(p) =>
    p.$selected ? theme.colors.main : theme.colors.gray4};
  justify-content: center;
  padding: 10px;
  border-radius: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const AlertButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  background-color: ${theme.colors.gray5};
  color: ${theme.colors.gray2};
  padding: 6px 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
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
