import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SmallButton } from "@/components/small-button";
import { useState } from "react";

export function QuizItem({
  index,
  title,
  answer,
  description,
  type,
  options,
  isCompleted,
  isCorrect,
  userType,
  quizId,
  onSubmitAnswer,
}: {
  index: number;
  type: "OX" | "MULTIPLE";
  options: { label: string; content: string }[];
  title: string;
  answer: string;
  description: string;
  isCompleted: boolean;
  isCorrect: boolean | null;
  userType?: string | null;
  quizId: number;
  onSubmitAnswer?: (quizId: number, selectedAnswer: string) => void;
}) {
  const handleClick = (option: { label: string; content: string }) => {
    if (userType === "employee" && !isCompleted && onSubmitAnswer) {
      const selected =
        type === "OX" ? option.label : `${option.label}) ${option.content}`;
      setClicked(selected);
      onSubmitAnswer(quizId, selected);
    }
  };
  const [clicked, setClicked] = useState<string | null>(null);

  // 배경색 직접 제어
  const getBgColor = (option: { label: string; content: string }) => {
    const optionText =
      type === "OX" ? option.label : `${option.label}) ${option.content}`;

    // 내가 클릭한 보기 → 오렌지색 유지
    if (clicked === optionText) return theme.colors.main;

    // 오답일 경우 → 정답 보기만 빨간색
    if (isCompleted && isCorrect === false && optionText === answer)
      return theme.colors.negative;

    // 기본 회색
    return theme.colors.gray3;
  };
  return (
    <QuizItemWrapper>
      <QuizTitle>
        <QuizTitleText>
          Q{index}.{type === "OX" ? "OX" : "객관식"} 문제
        </QuizTitleText>
        <QuizTitleContent>{title}</QuizTitleContent>
      </QuizTitle>
      <QuizAnswer>
        {type === "OX"
          ? ["O", "X"].map((opt) => (
              <QuizAnswerItem
                key={opt}
                onClick={() => handleClick({ label: opt, content: "" })}
                style={{
                  backgroundColor: getBgColor({ label: opt, content: "" }),
                  cursor:
                    userType === "employee" && !isCompleted
                      ? "pointer"
                      : "default",
                  transition: "background-color 0.3s ease",
                }}
              >
                {opt}
              </QuizAnswerItem>
            ))
          : options.map((option) => (
              <QuizAnswerItem
                key={option.label}
                onClick={() => handleClick(option)}
                style={{
                  backgroundColor: getBgColor(option),
                  cursor:
                    userType === "employee" && !isCompleted
                      ? "pointer"
                      : "default",
                  transition: "background-color 0.3s ease",
                }}
              >
                {option.label}) {option.content}
              </QuizAnswerItem>
            ))}
      </QuizAnswer>
      {/* 사장님 or (알바생인데 이미 맞춘 경우)만 해설·정답 표시 */}
      {(userType === "owner" || (userType === "employee" && isCompleted)) && (
        <>
          <QuizDescription>해설: {description}</QuizDescription>
          <ButtonWrapper>
            <SmallButton text={`정답: ${answer}`} />
          </ButtonWrapper>
        </>
      )}
    </QuizItemWrapper>
  );
}

const QuizItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  width: 100%;
  border-radius: 20px;
  padding: 27px 32px;
  box-shadow: ${theme.effects.effect4};
`;

const QuizTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuizTitleText = styled.div`
  font-size: ${theme.texts.body4.fontSize};
  font-weight: 700;
  line-height: ${theme.texts.body4.lineHeight};
  color: ${theme.colors.main};
`;

const QuizTitleContent = styled.div`
  font-size: ${theme.texts.body4.fontSize};
  font-weight: ${theme.texts.body4.fontWeight};
  line-height: ${theme.texts.body4.lineHeight};
  color: ${theme.colors.gray1};
`;

const QuizAnswer = styled.div`
  display: flex;
  gap: 15px;
`;

const QuizAnswerItem = styled.div`
  font-size: ${theme.texts.body5.fontSize};
  font-weight: ${theme.texts.body5.fontWeight};
  line-height: ${theme.texts.body5.lineHeight};
  background-color: ${theme.colors.gray3};
  color: ${theme.colors.white};
  border-radius: 5px;
  padding: 6px 18px;
`;

const QuizDescription = styled.div`
  font-size: ${theme.texts.body7.fontSize};
  font-weight: ${theme.texts.body7.fontWeight};
  line-height: ${theme.texts.body7.lineHeight};
  color: ${theme.colors.gray2};
`;

const ButtonWrapper = styled.div`
  width: fit-content;
`;
