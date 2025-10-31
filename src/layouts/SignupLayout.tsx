import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "@/components/header";
import { theme } from "@/styles/theme";
import LogoText from "@/assets/logos/logo_text";
import { useMatches } from "react-router-dom";

export default function SignupLayout({ isLogo = true }: { isLogo?: boolean }) {
  const matches = useMatches();
  const title = (matches.at(-1)?.handle as { title: string })?.title;

  return (
    <Viewport>
      <AppArea>
        <Header title={title || "회원가입"} headerType="signup" />
        <AreaContainer>
          {isLogo && (
            <TitleContainer>
              <LogoText width={117} height={90} />
              <Title>{title}</Title>
            </TitleContainer>
          )}
          <Outlet />
        </AreaContainer>
      </AppArea>
    </Viewport>
  );
}

// 화면 전체(바깥) — 흰 배경, 중앙 정렬
const Viewport = styled.div`
  display: flex;
  justify-content: center;
  background: #fff;
  min-height: 100vh;
`;

// 중앙 고정 폭 영역
const AppArea = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 430px;
  background: ${theme.colors.white};
`;

const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 430px;
  padding-top: 90px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 93px;
`;

const Title = styled.div`
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  color: ${theme.colors.gray3};
`;
