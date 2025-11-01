import styled from "styled-components";
import { theme } from "@/styles/theme";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 locale import
import BackIcon from "@/assets/icons/ic_back";
import PersonFillIcon from "@/assets/icons/ic_person-fill";

interface ScheduleModalProps {
  date: string;
  workers: { name: string; id: string }[];
  onClose: () => void;
}

export function ScheduleModal({ date, workers, onClose }: ScheduleModalProps) {
  return (
    <ModalOverlay>
      <ModealBack onClick={onClose}>
        <BackIcon color={theme.colors.white} />
      </ModealBack>
      <ModalTitleContainer>
        <ModalTitle>
          {format(new Date(date), "M월 d일 EEE", { locale: ko })}
        </ModalTitle>
      </ModalTitleContainer>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {workers.map((worker, i) => (
          <WorkerCard key={i}>
            <PersonFillIcon width={47} height={47} color={theme.colors.main} />

            <WorkInfo>
              <EmployeeItemName>{worker.name}</EmployeeItemName>
              <EmployeeItemId>{worker.id}</EmployeeItemId>
            </WorkInfo>
          </WorkerCard>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  width: 100%;
  height: 100dvh;
  padding: 25px;
`;

const ModealBack = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 50px;
  left: 25px;
`;

const ModalTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ModalTitle = styled.h3`
  font-size: 1.55rem;
  font-weight: ${theme.texts.h4.fontWeight};
  color: ${theme.colors.white};
  margin-bottom: 7px;
  margin-left: 7px;
  text-align: center;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: 13px;
  padding: 24px;
  width: 100%;
  height: 55vh;
  overflow-y: auto;
  box-shadow: ${theme.effects.effect1};
`;

const WorkerCard = styled.div`
  display: flex;
  align-items: space-between;
  gap: 12px;
  padding: 10px 0;
`;

const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
