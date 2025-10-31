import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Header } from "@/components/header";
import { useMatches } from "react-router-dom";

export default function EducationDetailsLayout() {
  const matches = useMatches();
  const title = (matches.at(-1)?.handle as { title: string })?.title;

  const [activeTab, setActiveTab] = useState<"manual" | "quiz">("manual");

  return (
    <Viewport>
      <AppArea>
        <Header
          title={title}
          headerType="details"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <AreaContainer>
          {/* 아래에서 Outlet 대신 직접 조건부 렌더링 (또는 manual/quiz Container import해서 사용) */}
          {activeTab === "manual" && <Outlet context={{ activeTab }} />}
          {activeTab === "quiz" && <Outlet context={{ activeTab }} />}
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
  background: #fff;
`;

const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 430px;
  padding-top: 140px;
  padding-bottom: 91px;
`;
