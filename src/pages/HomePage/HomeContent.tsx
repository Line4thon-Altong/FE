// src/components/home/HomeContent.jsx
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SmallButton } from "@/components/small-button";
import PersonFillIcon from "@/assets/icons/ic_person-fill";
import PlusIcon from "@/assets/icons/ic_plus-fill";
import { EducationItem } from "@/components/home/education-item";

type HomeContentProps = {
  userType: "owner" | "employee";
  employeeCount?: number;
  educationItems: { title: string; date: string }[];
  onEmployeeManageClick?: () => void;
  onCreateEducationClick?: () => void;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  isCheckedIn?: boolean;
};

export function HomeContent({
  userType, // "owner" | "employee"
  employeeCount,
  educationItems,
  onEmployeeManageClick,
  onCreateEducationClick,
  onCheckIn,
  onCheckOut,
  isCheckedIn,
}: HomeContentProps) {
  return (
    <Container>
      {/* 상단 섹션 */}
      <ManagementContainer>
        <ManagementTitleContainer>
          <ManagementTitle>
            {userType === "owner" ? (
              "알바생 관리"
            ) : (
              <>
                <Emoji>💪</Emoji>출/퇴근 관리
              </>
            )}
          </ManagementTitle>
          <ManagementDescription>
            {userType === "owner"
              ? "알바생을 추가해 교육 자료를 공유해주세요."
              : "출근 퇴근을 눌러주세요."}
          </ManagementDescription>
        </ManagementTitleContainer>

        <ManagementEmployeeContainer>
          {userType === "owner" && (
            <ManagementEmployeeCountContainer>
              <PersonFillIcon width={20} height={20} />
              <ManagementEmployeeCount>
                {employeeCount}명
              </ManagementEmployeeCount>
            </ManagementEmployeeCountContainer>
          )}

          {userType === "owner" ? (
            <SmallButton text="관리하기" onClick={onEmployeeManageClick} />
          ) : (
            <CheckButtons>
              <CheckButton active={isCheckedIn} onClick={onCheckIn}>
                출근하기
              </CheckButton>
              <CheckButton active={!isCheckedIn} onClick={onCheckOut}>
                퇴근하기
              </CheckButton>
            </CheckButtons>
          )}
        </ManagementEmployeeContainer>
      </ManagementContainer>

      {/* 교육 섹션 */}
      <ManagementContainer>
        <ManagementTitleContainer>
          <ManagementTitle>
            {userType === "owner" ? (
              "교육 관리"
            ) : (
              <>
                {" "}
                <Emoji>💪</Emoji>교육 자료
              </>
            )}
          </ManagementTitle>
          <ManagementDescription>
            {userType === "owner"
              ? "알바생이 쉽게 배우고 일할 수 있게 교육을 생성해주세요."
              : "교육 자료를 열람해 알바 마스터가 되어보세요."}
          </ManagementDescription>
        </ManagementTitleContainer>

        {userType === "owner" && (
          <ButtonContainer>
            <SmallButton
              text="교육 생성하기"
              onClick={onCreateEducationClick}
            />
          </ButtonContainer>
        )}

        <EducationItemContainer>
          {educationItems.map((item, index) => (
            <EducationItem key={index} title={item.title} date={item.date} />
          ))}
        </EducationItemContainer>

        {userType === "owner" && (
          <PlusIconContainer>
            <PlusIcon width={24} height={24} color={theme.colors.gray3} />
          </PlusIconContainer>
        )}
      </ManagementContainer>
    </Container>
  );
}

/* styled-components */
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 31px 22px 24px 22px;
  gap: 18px;
  width: 100%;
`;

//직원용 타이틀에 들어가는 이모지
const Emoji = styled.span`
  font-size: 1.2em; /* 텍스트보다 살짝 크게 */
  margin-right: 2px;
`;

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: 23px 31px;
  border-radius: 20px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const ManagementTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const ManagementTitle = styled.div`
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  color: ${theme.colors.gray2};
`;

const ManagementDescription = styled.div`
  font-size: ${theme.texts.subtitle3.fontSize};
  color: ${theme.colors.gray2};
`;

const ManagementEmployeeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ManagementEmployeeCountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ManagementEmployeeCount = styled.div`
  font-size: ${theme.texts.h1.fontSize};
  font-weight: ${theme.texts.h1.fontWeight};
  color: ${theme.colors.gray2};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EducationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 18px 0;
`;

const PlusIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//직원 출퇴근 버튼 추가
const CheckButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
`;

//직원 출퇴근 버튼
const CheckButton = styled.button`
  background-color: ${(p) =>
    p.active ? theme.colors.main : theme.colors.gray3};
  color: rgba(255, 255, 255, 1);
  transition: background-color 0.2s ease;
  padding: 6px 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
`;
