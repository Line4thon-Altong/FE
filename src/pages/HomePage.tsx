import { theme } from "@/styles/theme";
import styled from "styled-components";
import { SmallButton } from "@/components/small-button";
import PersonFillIcon from "@/assets/icons/ic_person-fill";
import { EducationItem } from "@/components/home/education-item";
import PlusIcon from "@/assets/icons/ic_plus-fill";
import { useNavigate } from "react-router-dom";
const educationItems = [
  {
    title: "교육 1",
    date: "2025.01.01",
  },
  {
    title: "교육 2",
    date: "2025.01.01",
  },
  {
    title: "교육 3",
    date: "2025.01.01",
  },
  {
    title: "교육 4",
    date: "2025.01.01",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const handleManagementEmployee = () => {
    navigate("/employee-management");
  };

  return (
    <Container>
      {/* 알바생 관리 */}
      <ManagementContainer>
        <ManagementTitleContainer>
          <ManagementTitle>알바생 관리</ManagementTitle>
          <ManagementDescription>
            알바생을 추가해 교육 자료를 공유해주세요.
          </ManagementDescription>
        </ManagementTitleContainer>
        <ManagementEmployeeContainer>
          <ManagementEmployeeCountContainer>
            <PersonFillIcon width={20} height={20} />
            <ManagementEmployeeCount>0명</ManagementEmployeeCount>
          </ManagementEmployeeCountContainer>
          <SmallButton text="관리하기" onClick={handleManagementEmployee} />
        </ManagementEmployeeContainer>
      </ManagementContainer>
      {/* 교육 관리 */}
      <ManagementContainer>
        <ManagementTitleContainer>
          {/* 교육 관리 */}
          <ManagementTitle>교육 관리</ManagementTitle>
          <ManagementDescription>
            알바생이 쉽게 배우고 일할 수 있게 교육을 생성해주세요.
          </ManagementDescription>
        </ManagementTitleContainer>
        <ButtonContainer>
          <SmallButton text="교육 생성하기" />
        </ButtonContainer>
        <EducationItemContainer>
          {educationItems.map((item, index) => (
            <EducationItem key={index} title={item.title} date={item.date} />
          ))}
        </EducationItemContainer>
        <PlusIconContainer>
          <PlusIcon width={24} height={24} color={theme.colors.gray3} />
        </PlusIconContainer>
      </ManagementContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 31px 22px 24px 22px;
  align-items: center;
  gap: 18px;
`;

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: 23px 31px;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
`;

const ManagementTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const ManagementTitle = styled.div`
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  line-height: ${theme.texts.subtitle1.lineHeight};
  color: ${theme.colors.gray2};
`;

const ManagementDescription = styled.div`
  font-size: ${theme.texts.subtitle3.fontSize};
  font-weight: ${theme.texts.subtitle3.fontWeight};
  line-height: ${theme.texts.subtitle3.lineHeight};
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
  line-height: ${theme.texts.h1.lineHeight};
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
