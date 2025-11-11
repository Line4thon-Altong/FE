import styled from "styled-components";
import { theme } from "@/styles/theme";
import image from "@/assets/temp/education-details.png";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuizItem } from "@/components/education-details/quiz-item";
import { useEffect, useState } from "react";

// 매뉴얼
function ManualContainer({
  data,
}: {
  data: {
    title: string;
    goal: string;
    procedure: { step: string; details: string[] }[];
    precaution: string[];
    cardnewsImageUrl: string;
  };
}) {
  return (
    <Container>
      <GoalTitle>📌 목표: {data.goal}</GoalTitle>
      <Hr />
      <ManualSection>
        {data.procedure.map((item, index) => (
          <ManualItem key={index}>
            <ManualSubTitle>{item.step}</ManualSubTitle>
            {item.details.map((d, i) => (
              <ManualContent key={i}>{d}</ManualContent>
            ))}
          </ManualItem>
        ))}
      </ManualSection>

      <AttentionSection>
        <AttentionTitle>⚠️ 주의 포인트</AttentionTitle>
        <AttentionPointList>
          {data.precaution.map((point, i) => (
            <AttentionPoint key={i}>{point}</AttentionPoint>
          ))}
        </AttentionPointList>
      </AttentionSection>

      <SummarySection>
        <SummaryTitle>💪 알통 4컷 요약</SummaryTitle>
        <SummaryImage src={data.cardnewsImageUrl} alt="education-details" />
      </SummarySection>
    </Container>
  );
}

type Quiz = {
  id: number;
  type: "OX" | "MULTIPLE";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  isCompleted: boolean;
  isCorrect: boolean | null;
};
// 퀴즈
function QuizContainer() {
  const { trainingId } = useParams();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setError(null);
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          return;
        }

        const res = await axios.get(
          `https://altong.store/api/trainings/${trainingId}/quiz`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          }
        );

        if (res.status === 401) {
          console.warn("401 Unauthorized - 토큰 만료 또는 유효하지 않음");
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }

        const apiData = res.data.data || [];
        console.log("quiz 응답 :", apiData);
        const parsedQuiz = apiData.map((q: any) => ({
          id: q.id,
          type: q.type,
          question: q.question,
          options: JSON.parse(q.options), // 문자열 -> 배열 변환
          answer: q.answer,
          explanation: q.explanation,
          isCompleted: q.isCompleted,
          isCorrect: q.isCorrect,
        }));

        setQuizList(parsedQuiz);
      } catch (err) {
        console.error("퀴즈 불러오기 실패:", err);
        setError("퀴즈 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [trainingId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!quizList.length) return <div>등록된 퀴즈가 없습니다.</div>;

  return (
    <QuizLayout>
      {quizList.map((item, index) => (
        <QuizItem
          key={item.id}
          index={index + 1}
          type={item.type}
          options={item.options.map((o: string) => ({
            label: o[0], // "A) 바닥과 테이블" → label: "A"
            content: o.slice(3), // 내용만 추출
          }))}
          title={item.question}
          answer={item.answer}
          description={item.explanation}
        />
      ))}
    </QuizLayout>
  );
}

export function EducationDetailsPage() {
  const { trainingId } = useParams(); // URL 파라미터 가져오기
  const { activeTab } = useOutletContext<{ activeTab: "manual" | "quiz" }>();
  const navigate = useNavigate();
  const [data, setData] = useState<{
    title: string;
    goal: string;
    procedure: { step: string; details: string[] }[];
    precaution: string[];
    cardnewsImageUrl: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEducationDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const userType = localStorage.getItem("usertype");
        if (!token) {
          setError("로그인이 필요합니다.");
          return;
        }
        const baseUrl =
          userType === "employee"
            ? `https://altong.store/api/employees/trainings/${trainingId}/manuals`
            : `https://altong.store/api/trainings/${trainingId}/manuals`;

        const res = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        if (res.status === 401) {
          console.warn("401 Unauthorized - 토큰 만료 또는 유효하지 않음");
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }

        const apiData = res?.data?.data;
        setData(apiData);
      } catch (err) {
        console.error("교육 상세 불러오기 실패:", err);
        setError("교육 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducationDetails();
  }, [trainingId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return activeTab === "manual" ? (
    <ManualContainer data={data} />
  ) : (
    <QuizContainer />
  );
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
