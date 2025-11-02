import { useState } from "react";
import { Input } from "@/components/input";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { LargeButton } from "@/components/large-button";
import { Alert } from "@/components/alert";

export function AccountPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // 변경 비밀번호 검증: 영문과 숫자를 포함하고 6~12자 사이
  const isNewPasswordValid = (password: string) => {
    if (password.length < 6 || password.length > 12) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  };

  // 비밀번호 일치 여부 확인
  const isPasswordMatch = newPassword === confirmPassword;

  const isPasswordFormValid =
    currentPassword.trim() &&
    isNewPasswordValid(newPassword) &&
    confirmPassword.trim() &&
    isPasswordMatch;

  const handlePasswordChange = () => {
    setAlertTitle("비밀번호");
    setIsAlertOpen(true);
  };

  const handleStoreNameChange = () => {
    setAlertTitle("상호명");
    setIsAlertOpen(true);
  };

  return (
    <>
      {isAlertOpen && (
        <Alert
          title="변경 완료"
          description={`${alertTitle} 변경이 완료되었습니다.`}
          alertType="alert"
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      <Container>
        <ContentWrapper>
          <Title>비밀번호 변경</Title>
          <Content>
            <Input
              title="현재 비밀번호"
              placeholder="현재 비밀번호"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              title="변경 비밀번호"
              placeholder="영문, 숫자를 포함한 6자~12자 이내"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              title="변경 비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Content>
          <LargeButton
            text="변경하기"
            textType="others"
            onClick={handlePasswordChange}
            disabled={!isPasswordFormValid}
          />
        </ContentWrapper>
        <ContentWrapper>
          <Title>상호명 변경</Title>
          <Content>
            <Input
              title="상호명"
              placeholder="상호명"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Content>
          <LargeButton
            text="변경하기"
            onClick={handleStoreNameChange}
            disabled={!storeName.trim()}
          />
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 40px;
  gap: 76px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 25px;
`;

const Title = styled.div`
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  line-height: ${theme.texts.subtitle1.lineHeight};
  color: ${theme.colors.gray1};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
