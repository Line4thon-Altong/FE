import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import StoreIcon from "@/assets/icons/ic_store";
import BackIcon from "@/assets/icons/ic_back";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  headerType?: "signup" | "home" | "details";
  title?: string;
}

export function Header({ title, headerType = "home" }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper $signup={headerType === "signup"}>
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
              <StoreIcon width={16} height={16} color={theme.colors.main} />
            </StoreIconContainer>
            <Title>{title}</Title>
          </StoreContainer>
        </HomeWrapper>
      )}
      {headerType === "details" && (
        <DetailsWrapper>
          <BackIconContainer>
            <BackIcon width={8} height={16} color={theme.colors.gray3} />
          </BackIconContainer>
          <Title>{title}</Title>
        </DetailsWrapper>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div<{ $signup?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${theme.colors.white};
  height: 90px;
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
  align-items: flex-start;
  gap: 6px;
`;

const StoreIconContainer = styled.div`
  margin-top: 1px;
`;

const Title = styled.div<{ $signup?: boolean }>`
  font-size: ${theme.texts.h3.fontSize};
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

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const BackIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
`;
