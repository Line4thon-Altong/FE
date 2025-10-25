import styled from "styled-components";
import { theme } from "@/styles/theme";
import LogoText from "@/assets/logos/logo_text";
import { Input } from "@/components/input";
import { LargeButton } from "@/components/large-button";
import { useState } from "react";
import { Alert } from "@/components/alert";

export function LoginPage() {
  const [loginType, setLoginType] = useState<"employee" | "owner">("employee");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogin = () => {
    setIsAlertOpen(true);
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title="로그인 실패"
          description="아이디 또는 비밀번호가 일치하지 않습니다."
          alertType="alert"
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      <LogoText width={149} height={116} />
      <Content>
        <LoginTypeContainer>
          <TypeButton
            $isActive={loginType === "employee"}
            onClick={() => setLoginType("employee")}
          >
            알바생
          </TypeButton>
          <TypeButton
            $isActive={loginType === "owner"}
            onClick={() => setLoginType("owner")}
          >
            사장님
          </TypeButton>
        </LoginTypeContainer>
        <InputContainer>
          <Input placeholder="아이디" type="text" />
          <Input placeholder="비밀번호" type="password" />
        </InputContainer>
        <LargeButton text="로그인" onClick={handleLogin} textType="login" />
        <SignupLink>회원가입</SignupLink>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 51px;
  align-items: center;
  height: 100vh;
  padding-top: 225px;
  background: ${theme.colors.white};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
  margin-top: 17px;
`;

const LoginTypeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const TypeButton = styled.button<{ $isActive: boolean }>`
  padding: 0;
  padding-top: ${({ $isActive }) => ($isActive ? 0 : "6px")};
  padding-bottom: ${({ $isActive }) => ($isActive ? "12px" : "6px")};
  background-color: ${theme.colors.white};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.sub1 : theme.colors.gray4};
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  border: none;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? theme.colors.sub1 : "#dddddd")};

  &:hover {
    color: ${theme.colors.sub1};
    border-bottom: 2px solid ${theme.colors.sub1};
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SignupLink = styled.a`
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
  color: ${theme.colors.sub1};
  text-decoration: underline;
  cursor: pointer;
`;
