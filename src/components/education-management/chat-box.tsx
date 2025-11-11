import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import LogoSymbol from "@/assets/logos/logo_symbol";

interface ChatBoxProps {
  text: string;
  isUser: boolean;
  showIcon?: boolean;
}

export function ChatBox({ text, isUser, showIcon = true }: ChatBoxProps) {
  return (
    <ChatBoxWrapper $isUser={isUser}>
      {!isUser && showIcon && <LogoSymbol width={40} height={40} />}
      <TextWrapper $isUser={isUser} $showIcon={showIcon}>
        {text}
      </TextWrapper>
    </ChatBoxWrapper>
  );
}

const ChatBoxWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  width: 100%;
  ${({ $isUser }) =>
    $isUser &&
    css`
      justify-content: flex-end;
    `}
`;

const TextWrapper = styled.div<{ $isUser: boolean; $showIcon: boolean }>`
  padding: 10px;
  border-radius: 20px;
  background-color: ${theme.colors.gray5};
  color: ${theme.colors.gray1};
  font-size: ${theme.texts.body4.fontSize};
  font-weight: ${theme.texts.body4.fontWeight};
  line-height: ${theme.texts.body4.lineHeight};
  white-space: pre-line;
  margin-left: 40px;
  margin-top: 11px;

  ${({ $isUser }) =>
    $isUser &&
    css`
      margin: 10px 0;
      background-color: ${theme.colors.main};
      color: ${theme.colors.white};
    `}
  ${({ $showIcon }) =>
    $showIcon &&
    css`
      margin-left: 0;
      margin-top: 27px;
      max-width: 85%;
    `}
`;
