import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import SendIcon from "@/assets/icons/ic_send";
import PlusIcon from "@/assets/icons/ic_plus";

interface InputMessageProps {
  activate: boolean;
}
export function InputMessage({ activate }: InputMessageProps) {
  return (
    <InputMessageWrapper>
      <InputMessageContainer $activate={activate}>
        <InputMessageButton>
          <PlusIcon width={11} height={11} />
        </InputMessageButton>
        <InputMessageInput type="text" placeholder="메시지를 입력해주세요." />
        <InputMessageButton>
          <SendIcon
            width={21}
            height={22}
            color={activate ? theme.colors.main : theme.colors.gray3}
          />
        </InputMessageButton>
      </InputMessageContainer>
    </InputMessageWrapper>
  );
}

const InputMessageWrapper = styled.div`
  width: 430px;
  z-index: 1000;
  display: flex;
  padding: 19px 32px 34px 32px;
  box-shadow: ${theme.effects.effect3};
  background-color: ${theme.colors.white};
`;

const InputMessageContainer = styled.div<{ $activate: boolean }>`
  display: flex;
  width: 100%;
  border: 1px solid ${theme.colors.gray3};
  border-radius: 20px;
  padding: 8px 15px;
  ${({ $activate }) =>
    $activate &&
    css`
      border: 1px solid ${theme.colors.main};
    `}
`;

const InputMessageInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 1px 14px;
  font-size: ${theme.texts.body7.fontSize};
  font-weight: ${theme.texts.body7.fontWeight};
  line-height: ${theme.texts.body7.lineHeight};
  color: ${theme.colors.gray1};
  &::placeholder {
    color: ${theme.colors.gray3};
    font-size: ${theme.texts.body7.fontSize};
    font-weight: ${theme.texts.body7.fontWeight};
    line-height: ${theme.texts.body7.lineHeight};
  }
`;

const InputMessageButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;
