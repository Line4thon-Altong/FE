import styled from "styled-components";
import { theme } from "@/styles/theme";
import image from "@/assets/temp/education-details.png";
import { useOutletContext } from "react-router-dom";
import { QuizItem } from "@/components/education-details/quiz-item";

const goal = "손님을 웃게 만드는 주문, 실수 없는 결제";

const manualList = [
  {
    subTitle: "1. 인사는 활짝!",
    content: `"안녕하세요~ 오늘 날이 참 좋죠?" 손님이 들어오면 먼저 웃으면서 인사해요. 첫인상은 진짜 중요하거든요. 기분 좋은 시작이 장사 반이에요~`,
  },
  {
    subTitle: "2. 주문 받을 땐 꼼꼼하게",
    content: `"HOT이요? ICE요? 사이즈는 라지로 괜찮으세요?" "샷 추가하실 건가요? 시럽은 바닐라/헤이즐넛 중 어떤 걸로 할까요?" 손님이 말 다 하기 전에 끼어들면 안 돼요! 그냥 미소 지으면서 다 듣고, 그다음 확인~ 😄`,
  },
  {
    subTitle: "3. 포장/매장 체크",
    content: `"포장이세요? 드시고 가세요?" 포장이면 포장 스티커 잘 붙었는지 한 번 확인! 이거 안 붙으면 손님 헷갈리거든요~`,
  },
  {
    subTitle: "4. 결제 전 최종 확인!",
    content: `"아메리카노 아이스 라지 1잔, 포장 맞으시죠?" 항상 한 번 더 확인! 실수 줄이는 건 결국 꼼꼼함이에요~`,
  },
  {
    subTitle: "5. 결제 안내 & 마무리 멘트",
    content: `"결제 도와드릴게요~ 카드로 하실까요, 간편결제로 하실까요?" "영수증은 필요하실까요?" 마지막엔 꼭 한 번 더 미소 지어줘요. "잠시만 기다려 주세요~ 금방 만들어드릴게요 ☕"`,
  },
];

const attentionPoints = [
  "손님 말 끊지 않기",
  "주문 반복 확인은 생략 금지",
  "밝은 목소리 유지 (힘든 날도 웃자~^^ 오늘은 날이 좋구만~ 🌤️)",
];

// 매뉴얼
function ManualContainer() {
  return (
    <Container>
      <GoalTitle>📌 목표: {goal}</GoalTitle>
      <Hr />
      <ManualSection>
        {manualList.map((item, index) => (
          <ManualItem key={index}>
            <ManualSubTitle>{item.subTitle}</ManualSubTitle>
            <ManualContent>{item.content}</ManualContent>
          </ManualItem>
        ))}
      </ManualSection>

      <AttentionSection>
        <AttentionTitle>⚠️ 주의 포인트</AttentionTitle>
        <AttentionPointList>
          {attentionPoints.map((point, index) => (
            <AttentionPoint key={index}>{point}</AttentionPoint>
          ))}
        </AttentionPointList>
      </AttentionSection>

      <SummarySection>
        <SummaryTitle>💪 알통 4컷 요약</SummaryTitle>
        <SummaryImage src={image} alt="education-details" />
      </SummarySection>
    </Container>
  );
}

const quizList = [
  {
    title: "결제 전에 주문 내역을 확인하면 좋다!",
    type: "OX",
    answer: "O",
    description: "요건 습관처럼 해야 돼요~ 실수는 예방이 최고!",
  },
  {
    title: "포장 주문 시 꼭 확인해야 할 것은?",
    type: "MULTIPLE",
    options: [
      {
        label: "A",
        content: "결제 방식 확인",
      },
      {
        label: "B",
        content: "포장 스티커",
      },
    ],
    answer: "B",
    description: "포장 스터커 안 붙이면 헷갈리죠~",
  },
  {
    title: `손님: "HOT이요."
    알바: (여기에 들어갈 멘트는?)`,
    type: "MULTIPLE",
    options: [
      {
        label: "A",
        content: "알겠습니다~ 라지 괜찮으세요?",
      },
      {
        label: "B",
        content: "네 그래요.",
      },
    ],
    answer: "A",
    description:
      "조금만 친절하게 말하자~ 밝게 대화하는 게 멋쟁이 알통 스타일이여~",
  },
];

// 퀴즈
function QuizContainer() {
  return (
    <QuizLayout>
      {quizList.map((item, index) => (
        <QuizItem
          index={index + 1}
          key={index}
          type={item.type as "OX" | "MULTIPLE"}
          options={item.options || []}
          title={item.title}
          answer={item.answer}
          description={item.description}
        />
      ))}
    </QuizLayout>
  );
}

export function EducationDetailsPage() {
  const { activeTab } = useOutletContext<{ activeTab: "manual" | "quiz" }>();
  return activeTab === "manual" ? <ManualContainer /> : <QuizContainer />;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 24px 40px 24px;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const GoalTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray1};
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.gray3};
`;

const ManualSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ManualItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2px;
`;

const ManualSubTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray1};
`;

const ManualContent = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: ${theme.texts.body8.fontWeight};
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray2};
  white-space: pre-line;
`;

const AttentionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding: 2px;
`;

const AttentionTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray1};
`;

const AttentionPointList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-left: 20px;
`;

const AttentionPoint = styled.li`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: ${theme.texts.body8.fontWeight};
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray1};
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding: 2px;
`;

const SummaryTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray1};
`;

const SummaryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const QuizLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 25px 36px;
`;
