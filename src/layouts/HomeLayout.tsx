import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import { theme } from "@/styles/theme";
import { useMatches } from "react-router-dom";

export default function HomeLayout() {
  const matches = useMatches();
  const title = (matches.at(-1)?.handle as { title: string })?.title;
  // 현재 pathname을 기준으로 activeItem 결정
  const getActiveItem = () => {
    if (location.pathname.includes("/mypage")) return "myPage";
    return "education"; // 기본값: 홈(교육)
  };
  return (
    <Viewport>
      <AppArea>
        <Header title={title} headerType="home" />
        <AreaContainer>
          <Outlet />
        </AreaContainer>
        <Navigation activeItem={getActiveItem()} />
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
  background: ${theme.colors.sub2};
`;

const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 430px;
  padding-top: 90px;
  padding-bottom: 103px;
`;
