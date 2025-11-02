import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SmallButton } from "@/components/small-button";

export function QuizItem({
  index,
  title,
  answer,
  description,
  type,
  options,
}: {
  index: number;
  type: "OX" | "MULTIPLE";
  options: { label: string; content: string }[];
  title: string;
  answer: string;
  description: string;
}) {
  return (
    <QuizItemWrapper>
      <QuizTitle>
        <QuizTitleText>
          Q{index}.{type === "OX" ? "OX" : "객관식"} 문제
        </QuizTitleText>
        <QuizTitleContent>{title}</QuizTitleContent>
      </QuizTitle>
      {type === "OX" && (
        <QuizAnswer>
          <QuizAnswerItem>O</QuizAnswerItem>
          <QuizAnswerItem>X</QuizAnswerItem>
        </QuizAnswer>
      )}
      {type === "MULTIPLE" && (
        <QuizAnswer>
          {options.map((option) => (
            <QuizAnswerItem key={option.label}>
              {option.label}) {option.content}
            </QuizAnswerItem>
          ))}
        </QuizAnswer>
      )}
      <QuizDescription>해설: {description}</QuizDescription>
      <ButtonWrapper>
        <SmallButton text={`정답: ${answer}`} />
      </ButtonWrapper>
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
