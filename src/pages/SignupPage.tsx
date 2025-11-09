import styled from "styled-components";
import { theme } from "@/styles/theme";
import { LargeButton } from "@/components/large-button";
import StoreIcon from "@/assets/icons/ic_store";
import PersonIcon from "@/assets/icons/ic_person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<"employee" | "owner">(
    "employee"
  );
  const navigate = useNavigate();
  const handleNext = () => {
    // 1localStorage에 선택한 역할 저장
    localStorage.setItem("usertype", selectedRole);

    // 경로 이동
    navigate(`/signup/${selectedRole}/terms`);
  };
  return (
    <Container>
      <SelectContainer>
        <SelectButton
          $isActive={selectedRole === "employee"}
          onClick={() => setSelectedRole("employee")}
        >
          <PersonIcon width={49} height={49} color={theme.colors.white} />
          <SelectButtonText>알바생</SelectButtonText>
        </SelectButton>
        <SelectButton
          $isActive={selectedRole === "owner"}
          onClick={() => setSelectedRole("owner")}
        >
          <StoreIcon width={49} height={49} color={theme.colors.white} />
          <SelectButtonText>사장님</SelectButtonText>
        </SelectButton>
      </SelectContainer>
      <LargeButton text="다음으로" textType="others" onClick={handleNext} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 60px 22px 58px 22px;
  align-items: center;
  justify-content: space-between;
`;

const SelectContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin: 0 24px;
`;

const SelectButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 72px 0;
  border-radius: 25px;
  border: none;
  background: ${({ $isActive }) =>
    $isActive ? theme.colors.logo : theme.colors.logo_deactivation};
  cursor: pointer;

  &:hover {
    background: ${theme.colors.logo};
  }
`;

const SelectButtonText = styled.div`
  font-size: ${theme.texts.h1.fontSize};
  font-weight: ${theme.texts.h1.fontWeight};
  line-height: ${theme.texts.h1.lineHeight};
  color: ${theme.colors.white};
`;
