import styled from "styled-components";
import { theme } from "@/styles/theme";
import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 locale import
import BackIcon from "@/assets/icons/ic_back";
import PersonFillIcon from "@/assets/icons/ic_person-fill";
import { useEffect } from "react";

interface WorkerInfo {
  name: string;
  id: string;
  startTime?: string | null;
  endTime?: string | null;
}

interface ScheduleModalProps {
  date: string;
  workers: WorkerInfo[];
  onClose: () => void;
}
interface CommuteBoxProps {
  bgColor?: string;
}

export function ScheduleModal({ date, workers, onClose }: ScheduleModalProps) {
  // 모달이 열릴 때 스크롤 잠금
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // 스크롤 막기
    return () => {
      document.body.style.overflow = originalStyle; // 닫을 때 원복
    };
  }, []);
  console.log("modal", date, workers, onClose);
  return (
    <ModalOverlay>
      <ModalBack
        onClick={(e) => {
          e.stopPropagation(); // overlay onClick이 먼저 실행되는 것 방지
          onClose();
          console.log("click");
        }}
      >
        <BackIcon color={theme.colors.white} />
      </ModalBack>

      <ModalTitleContainer>
        <ModalTitle>
          {format(new Date(date), "M월 d일 EEE", { locale: ko })}
        </ModalTitle>
      </ModalTitleContainer>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {workers.map((worker, i) => (
          <WorkerCard key={i}>
            <Profile>
              <PersonFillIcon
                width={47}
                height={47}
                color={theme.colors.main}
              />

              <WorkInfo>
                <EmployeeItemName>{worker.name}</EmployeeItemName>
                <EmployeeItemId>{worker.id}</EmployeeItemId>
              </WorkInfo>
            </Profile>

            <Commute>
              <CommuteInfo>
                <CommuteBox bgColor={theme.colors.main}>
                  출근: {worker.startTime ?? "x"}
                </CommuteBox>
                <CommuteBox>퇴근: {worker.endTime ?? "x"}</CommuteBox>
              </CommuteInfo>
            </Commute>
          </WorkerCard>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 50%; /* 세로 중앙 */
  left: 50%; /* 가로 중앙 */
  transform: translate(-50%, -50%); /* 완전 정가운데  */
  max-width: 430px;

  height: 100dvh; /* 실제 뷰포트 높이만큼 꽉 차게  */

  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  width: 100%;

  padding: 25px;
`;

const ModalBack = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 50px;
  left: 25px;
  cursor: pointer;
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

  /* 스크롤바 완전 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const WorkerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
`;

const Profile = styled.div`
  display: flex;
`;

const WorkInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 14px;
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
const Commute = styled.div`
  display: flex;
  margin-left: 61px;
`;

const CommuteInfo = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
`;

const CommuteBox = styled.div<CommuteBoxProps>`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 20px;
  padding: 0 9px;
  background-color: ${({ bgColor }) => bgColor || theme.colors.sub1};
  font-weight: 600;
  font-size: ${theme.texts.subtitle3.fontSize};
  color: rgba(255, 255, 255, 1);
  margin-right: 5px;
`;
