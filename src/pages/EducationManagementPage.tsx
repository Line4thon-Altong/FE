import styled from "styled-components";
import { ChatBox } from "@/components/education-management/chat-box";
import { SmallButton } from "@/components/small-button";
import { InputMessage } from "@/components/education-management/input-message";
import { useState } from "react";
const chatList = [
  {
    text: `안녕하세요 사장님 💪😊.
    사장님의 말투를 그대로 담은 교육 자료를 만들어볼게요.
    하나씩 여쭤볼테니, 질문에 답해주세요.`,
    isUser: false,
  },
  {
    text: "업종이 어떻게 되시나요?",
    isUser: false,
  },
  {
    text: "카페",
    isUser: true,
  },
  {
    text: `어떤 교육 주제를 만들까요?
    예를 들어, '주문하고 결제하는 기본 교육'처럼 교육의 제목을 알려주세요!`,
    isUser: false,
  },
  {
    text: "주문하고 결제하는 기본 교육",
    isUser: true,
  },
  {
    text: `이번 교육의 목표를 3개 정도 정리해주세요!
예를 들어, ‘손님 응대를 웃으면서, 옵션 실수 안 하기,
결제 후 영수증 꼭 물어보기’ 처럼 교육의 중요한 목표를 알려주세요!`,
    isUser: false,
  },
];

export function EducationManagementPage() {
  const [activateInput, setActivateInput] = useState(false);
  const [activateButton, setActivateButton] = useState(true);

  const handleActivateInput = () => {
    setActivateInput(true);
    setActivateButton(false);
  };

  return (
    <Container>
      {chatList.map((chat, index) => {
        const prevChat = index > 0 ? chatList[index - 1] : null;
        const showIcon = !chat.isUser && (!prevChat || prevChat.isUser);
        return (
          <ChatBox
            key={index}
            text={chat.text}
            isUser={chat.isUser}
            showIcon={showIcon}
          />
        );
      })}
      {activateButton && (
        <ButtonContainer>
          <SmallButton text="교육 생성하기" onClick={handleActivateInput} />
        </ButtonContainer>
      )}
      <InputMessageWrapper>
        <InputMessage activate={activateInput} />
      </InputMessageWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 47px 7px 17px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 114px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InputMessageWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
