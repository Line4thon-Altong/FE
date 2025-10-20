import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function BasicLayout() {
  return (
    <Viewport>
      <AppArea>
        <Outlet />
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
  width: 100%;
  min-height: 100vh;
  max-width: 430px;
  background: lightgray;
`;
