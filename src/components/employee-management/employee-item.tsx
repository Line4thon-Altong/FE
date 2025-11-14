//import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@/assets/icons/ic_delete";
import PersonFillIcon from "@/assets/icons/ic_person-fill";
import { theme } from "@/styles/theme";
import ArrowRightIcon from "@/assets/icons/ic_arrow-right";
//import { ScheduleModal } from "./schedule-modal";
//employeeItem 에서 모달 제거, selet 된 직원만 넘겨주도록 수정
export function EmployeeItem({
  name,
  id,
  onDelete,
  onSelect,
  isSchedule,
}: {
  name: string;
  id: string;
  onDelete: () => void;
  onSelect: () => void;
  isSchedule: boolean;
}) {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleScheduleClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      {/* {isModalOpen && (
        <ScheduleModal
          name={name}
          id={id}
          onClose={handleModalClose}
          onConfirm={handleModalClose}
        />
      )} */}
      <EmployeeItemWrapper>
        <EmployeeItemContent>
          <PersonFillIcon width={47} height={47} color={theme.colors.main} />
          <div>
            <EmployeeItemName>{name}</EmployeeItemName>
            <EmployeeItemId>{id}</EmployeeItemId>
          </div>
        </EmployeeItemContent>
        {isSchedule ? (
          <ButtonWrapper onClick={onSelect}>
            <ArrowRightIcon width={8} height={16} color={theme.colors.gray2} />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper onClick={onDelete}>
            <DeleteIcon width={23} height={24} />
          </ButtonWrapper>
        )}
      </EmployeeItemWrapper>
    </>
  );
}

const EmployeeItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const EmployeeItemContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const EmployeeItemName = styled.div`
  font-size: ${theme.texts.h2.fontSize};
  font-weight: ${theme.texts.h2.fontWeight};
  line-height: ${theme.texts.h2.lineHeight};
  color: ${theme.colors.gray1};
`;

const EmployeeItemId = styled.div`
  font-size: ${theme.texts.subtitle2.fontSize};
  font-weight: ${theme.texts.subtitle2.fontWeight};
  line-height: ${theme.texts.subtitle2.lineHeight};
  color: ${theme.colors.gray3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
