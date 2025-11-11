import styled from "styled-components";
import { ChatBox } from "@/components/education-management/chat-box";
import { SmallButton } from "@/components/small-button";
import { InputMessage } from "@/components/education-management/input-message";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
const initialChats = [
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
];

const questions = [
  "업종이 어떻게 되시나요?",
  `어떤 교육 주제를 만들까요?
예를 들어, '주문하고 결제하는 기본 교육'처럼 교육의 제목을 알려주세요!`,
  `이번 교육의 목표를 3개 정도 정리해주세요!
예를 들어, ‘손님 응대를 웃으면서, 옵션 실수 안 하기,
결제 후 영수증 꼭 물어보기’ 처럼 교육의 중요한 목표를 알려주세요!`,
  `교육 절차를 자세히 알려주세요!`,
  `주의하거나 하지 말아야 할 행동이 있을까요?`,
  `사장님 말투를 예시로 한 줄만 적어주세요 😊 이 톤으로 전체 메뉴얼을 만들 거예요!`,
];

export function EducationManagementPage() {
  const [chatList, setChatList] = useState(initialChats);
  const [activateInput, setActivateInput] = useState(false);
  const [activateButton, setActivateButton] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState({
    businessType: "",
    title: "",
    goal: [] as string[],
    procedure: [] as string[],
    precaution: [] as string[],
    tone: "",
  });

  // 새로운 대화 시작 (리셋)
  const resetChatFlow = () => {
    setChatList([
      {
        text: `안녕하세요 사장님 💪😊.
    사장님의 말투를 그대로 담은 교육 자료를 만들어볼게요.
    하나씩 여쭤볼테니, 질문에 답해주세요.`,
        isUser: false,
      },
      { text: questions[0], isUser: false },
    ]);
    setAnswers({
      businessType: "",
      title: "",
      goal: [],
      procedure: [],
      precaution: [],
      tone: "",
    });
    setStep(0);
    setActivateButton(false);
    setActivateInput(true);
  };

  // 대화가 추가될 때마다 자동 스크롤
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 유저 메시지 추가
    const userMessage = { text: inputValue, isUser: true };
    setChatList((prev) => [...prev, userMessage]);

    // 답변 저장
    const newAnswers = { ...answers };
    if (step === 0) newAnswers.businessType = inputValue;
    if (step === 1) newAnswers.title = inputValue;
    if (step === 2)
      newAnswers.goal = inputValue.split(",").map((s) => s.trim());
    if (step === 3)
      newAnswers.procedure = inputValue.split(",").map((s) => s.trim());
    if (step === 4)
      newAnswers.precaution = inputValue.split(",").map((s) => s.trim());
    if (step === 5) newAnswers.tone = inputValue;
    setAnswers(newAnswers);

    // 입력창 비우기
    setInputValue("");

    //  다음 질문 표시 (다음 step이 존재할 때만)
    if (step < questions.length - 1) {
      const nextQuestion = { text: questions[step + 1], isUser: false };
      setTimeout(() => {
        setChatList((prev) => [...prev, nextQuestion]);
        setStep((prev) => prev + 1);
      }, 600);
    } else {
      // 마지막 답변 후 서버 요청
      (async () => {
        const dto = {
          businessType: newAnswers.businessType,
          title: newAnswers.title,
          goal: newAnswers.goal,
          procedure: newAnswers.procedure,
          precaution: newAnswers.precaution,
          tone: newAnswers.tone,
        };

        console.log("교육 생성 요청 dto: ", dto);

        setChatList((prev) => [
          ...prev,
          {
            text: "좋습니다 🍵 이제 사장님의 말투와 내용을 반영해 교육 자료(메뉴얼-카드뉴스-퀴즈)를 만들어볼게요!",
            isUser: false,
          },
        ]);

        setTimeout(() => {
          setChatList((prev) => [
            ...prev,
            { text: "잠시만 기다려주세요...", isUser: false },
          ]);
        }, 1000);

        try {
          const token = localStorage.getItem("accessToken");
          //console.log("AccessToken:", localStorage.getItem("accessToken"));

          const res = await axios.post(
            "https://altong.store/api/trainings/manual",
            dto,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
              },
            }
          );

          // 성공 시 마지막 안내 메시지 출력
          setTimeout(() => {
            setChatList((prev) => [
              ...prev,
              {
                text: "교육 자료가 완성되었어요! 홈에서 완성된 교육 자료를 확인해주세요😉.",
                isUser: false,
              },
            ]);
          }, 1500);
          console.log("전송 완료:", res.data);

          setActivateButton(true); // ‘교육 생성하기’ 버튼 다시 표시
          setActivateInput(false); // 입력창 비활성화
          setStep(0); // step 초기화
        } catch (err) {
          console.error("전송 실패:", err);
          setChatList((prev) => [
            ...prev,
            {
              text: "서버 연결에 문제가 있습니다. 다시 시도해주세요 😥",
              isUser: false,
            },
          ]);
        }
      })();
    }
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
      {/*스크롤 기준점 */}
      <div ref={scrollRef} />

      {activateButton && (
        <ButtonContainer>
          <SmallButton text="교육 생성하기" onClick={resetChatFlow} />
        </ButtonContainer>
      )}

      <InputMessageWrapper>
        <InputMessage
          activate={activateInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSendMessage}
        />
      </InputMessageWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 47px 22px 17px;
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
