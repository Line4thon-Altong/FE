import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import StoreIcon from "@/assets/icons/ic_store";
import PersonIcon from "@/assets/icons/ic_person";
import BackIcon from "@/assets/icons/ic_back";
import SeeMoreIcon from "@/assets/icons/ic_seemore";
import EditIcon from "@/assets/icons/ic_edit";
import TrashIcon from "@/assets/icons/ic_trash";
import { Alert } from "@/components/alert";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  headerType?: "signup" | "home" | "details" | "chat";
  title?: string;
  activeTab?: "manual" | "quiz";
  onTabChange?: (tab: "manual" | "quiz") => void;
}

export function Header({
  title,
  headerType = "home",
  activeTab = "manual",
  onTabChange,
}: HeaderProps) {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const seeMoreIconRef = useRef<HTMLDivElement>(null);
  const [seeMorePos, setSeeMorePos] = useState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });
  const handleDelete = () => {
    setIsAlertOpen(true);
  };
  const handleSeeMore = () => {
    setIsSeeMoreOpen(!isSeeMoreOpen);
  };
  const [userType, setUserType] = useState<"owner" | "employee">("owner");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "owner") {
      setUserType("owner");
    } else {
      setUserType("employee");
    }
  }, []);

  useEffect(() => {
    if (!isSeeMoreOpen) return;
    const iconEl = seeMoreIconRef.current;
    const headerEl = headerRef.current;
    if (!iconEl || !headerEl) return;
    const iconRect = iconEl.getBoundingClientRect();
    const headerRect = headerEl.getBoundingClientRect();
    setSeeMorePos({
      top: iconRect.bottom - headerRect.top + 4,
      right: headerRect.right - iconRect.right,
    });
  }, [isSeeMoreOpen]);

  return (
    <>
      <HeaderWrapper
        ref={headerRef}
        $signup={headerType === "signup"}
        $details={headerType === "details"}
      >
        {headerType === "signup" && (
          <SignupWrapper>
            <BackIconButton onClick={() => navigate(-1)}>
              <BackIcon width={9} height={19} color={theme.colors.gray3} />
            </BackIconButton>
            <Title $signup={true}>{title}</Title>
          </SignupWrapper>
        )}
        {headerType === "home" && (
          <HomeWrapper>
            <StoreContainer>
              <StoreIconContainer>
                {userType === "owner" ? (
                  <StoreIcon width={22} height={22} color={theme.colors.main} />
                ) : (
                  <PersonIcon
                    width={22}
                    height={22}
                    color={theme.colors.main}
                  />
                )}
              </StoreIconContainer>
              <Title>{title}</Title>
            </StoreContainer>
          </HomeWrapper>
        )}
        {headerType === "chat" && (
          <ChatWrapper>
            <BackIconContainer>
              <BackIconButton onClick={() => navigate(-1)}>
                <BackIcon width={8} height={16} color={theme.colors.gray3} />
              </BackIconButton>
            </BackIconContainer>
            <Title>{title}</Title>
          </ChatWrapper>
        )}
        {headerType === "details" && (
          <DetailsWrapper>
            <HeaderContainer>
              <BackIconButton onClick={() => navigate(-1)}>
                <BackIcon width={8} height={16} color={theme.colors.gray3} />
              </BackIconButton>
              <Title>{title}</Title>
              <SeeMoreIconContainer
                ref={seeMoreIconRef}
                onClick={handleSeeMore}
              >
                <SeeMoreIcon width={5} height={22} color={theme.colors.gray3} />
              </SeeMoreIconContainer>
              {isSeeMoreOpen && (
                <SeeMoreOpenContainer
                  style={{ top: seeMorePos.top, right: seeMorePos.right }}
                >
                  <SeeMoreOpenItem>
                    <EditIcon width={14} height={14} />
                    <SeeMoreOpenItemText>수정</SeeMoreOpenItemText>
                  </SeeMoreOpenItem>
                  <SeeMoreOpenItem>
                    <TrashIcon width={14} height={14} />
                    <SeeMoreOpenItemText onClick={handleDelete}>
                      삭제
                    </SeeMoreOpenItemText>
                  </SeeMoreOpenItem>
                </SeeMoreOpenContainer>
              )}
            </HeaderContainer>
            <TabContainer>
              <TabItem
                $active={activeTab === "manual"}
                onClick={() => onTabChange && onTabChange("manual")}
              >
                매뉴얼
              </TabItem>
              <TabItem
                $active={activeTab === "quiz"}
                onClick={() => onTabChange && onTabChange("quiz")}
              >
                퀴즈
              </TabItem>
            </TabContainer>
          </DetailsWrapper>
        )}
      </HeaderWrapper>
      {isAlertOpen && (
        <Alert
          title="교육 삭제"
          description="교육을 삭제하시겠습니까?"
          alertType="delete"
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}

const HeaderWrapper = styled.div<{ $signup?: boolean; $details?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${theme.colors.white};
  height: ${({ $details }) => ($details ? "140px" : "90px")};
  width: 100%;
  max-width: 430px;
  box-shadow: ${({ $signup }) => ($signup ? "none" : theme.effects.effect2)};
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const SignupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 8px;
`;

const BackIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

const HomeWrapper = styled.div`
  padding: 0 30px;
  margin-bottom: 11px;
`;

const StoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StoreIconContainer = styled.div`
  margin-top: 1px;
`;

const Title = styled.div<{ $signup?: boolean }>`
  font-size: 20px;
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  color: ${theme.colors.gray2};
  ${({ $signup }) =>
    $signup &&
    css`
      color: ${theme.colors.gray3};
      margin-right: 7px;
    `}
`;

const ChatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  gap: 30px;
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const TabItem = styled.div<{ $active: boolean }>`
  padding-bottom: 10px;
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  color: ${theme.colors.gray3};
  cursor: pointer;
  ${({ $active }) =>
    $active &&
    css`
      color: ${theme.colors.main};
      border-bottom: 1px solid ${theme.colors.main};
    `}
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const BackIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
`;

const SeeMoreIconContainer = styled.div`
  cursor: pointer;
`;

const SeeMoreOpenContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const SeeMoreOpenItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background-color: ${theme.colors.main};
  padding: 2px 7px;
  border-radius: 16px;
  cursor: pointer;
`;

const SeeMoreOpenItemText = styled.div`
  font-size: ${theme.texts.body7.fontSize};
  font-weight: ${theme.texts.body7.fontWeight};
  line-height: ${theme.texts.body7.lineHeight};
  color: ${theme.colors.white};
`;
