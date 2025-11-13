import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface ProcedureItem {
  step: string;
  details: string[];
}

interface ManualData {
  title: string;
  goal: string;
  procedure: ProcedureItem[];
  precaution: string[];
}

export default function ManualEditPage() {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  const [manual, setManual] = useState({
    title: "",
    goal: "",
    procedure: [],
    precaution: [],
  });

  const [loading, setLoading] = useState(true);

  // 기존 메뉴얼 불러오기
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `https://altong.store/api/trainings/${trainingId}/manuals`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setManual(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("메뉴얼 로드 실패", err);
      }
    };

    fetchManual();
  }, []);

  if (loading) return <div>로딩중...</div>;

  // 목록 업데이트 함수들
  const updateField = <K extends keyof ManualData>(
    key: K,
    value: ManualData[K]
  ) => {
    setManual((prev) => ({ ...prev, [key]: value }));
  };

  const updateProcedureStep = (index: number, stepValue: string) => {
    const newProc = [...manual.procedure];
    newProc[index].step = stepValue;
    setManual({ ...manual, procedure: newProc });
  };

  const updateProcedureDetail = (
    pIndex: number,
    dIndex: number,
    detailValue: string
  ) => {
    const newProc = [...manual.procedure];
    newProc[pIndex].details[dIndex] = detailValue;
    setManual({ ...manual, procedure: newProc });
  };

  const updatePrecaution = (index: number, value: string) => {
    const newPrecaution = [...manual.precaution];
    newPrecaution[index] = value;
    setManual({ ...manual, precaution: newPrecaution });
  };

  //  PATCH 요청
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.patch(
        `https://altong.store/api/trainings/${trainingId}/manuals`,
        manual,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/education-details/${trainingId}`);
    } catch (err) {
      console.error("메뉴얼 수정 실패", err);
    }
  };

  return (
    <Container>
      {/* 목표 */}
      <GoalTitle>📌 목표</GoalTitle>
      <EditInput
        value={manual.goal}
        onChange={(e) => updateField("goal", e.target.value)}
      />
      <Hr />

      {/* 절차 */}
      <ManualSection>
        {manual.procedure.map((p, pIndex) => (
          <ManualItem key={pIndex}>
            <ManualSubTitle>단계 이름</ManualSubTitle>
            <EditInput
              value={p.step}
              onChange={(e) => updateProcedureStep(pIndex, e.target.value)}
            />

            <ManualSubTitle>세부 내용</ManualSubTitle>
            {p.details.map((d, dIndex) => (
              <EditTextarea
                key={dIndex}
                value={d}
                onChange={(e) =>
                  updateProcedureDetail(pIndex, dIndex, e.target.value)
                }
              />
            ))}
          </ManualItem>
        ))}
      </ManualSection>

      {/* 주의사항 */}
      <AttentionSection>
        <AttentionTitle>⚠️ 주의 포인트</AttentionTitle>
        {manual.precaution.map((point, index) => (
          <EditTextarea
            key={index}
            value={point}
            onChange={(e) => updatePrecaution(index, e.target.value)}
          />
        ))}
      </AttentionSection>

      {/* 요약 이미지 */}
      <SummarySection>
        <SummaryTitle>💪 알통 4컷 요약</SummaryTitle>
        <SummaryImage src={manual.cardnewsImageUrl} alt="summary" />
      </SummarySection>

      <SaveButton onClick={handleSave}>저장하기</SaveButton>
    </Container>
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
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
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
  gap: 12px;
  padding: 2px;
`;

const ManualSubTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  color: ${theme.colors.gray1};
`;

const AttentionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const AttentionTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  color: ${theme.colors.gray1};
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const SummaryTitle = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: 700;
  color: ${theme.colors.gray1};
`;

const SummaryImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.gray3};
  border-radius: 6px;
  font-size: ${theme.texts.body8.fontSize};
  color: ${theme.colors.gray1};
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.gray3};
  border-radius: 6px;
  font-size: ${theme.texts.body8.fontSize};
  color: ${theme.colors.gray1};
  resize: none;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: ${theme.colors.main};
  border-radius: 10px;
  color: white;
  font-size: ${theme.texts.body7.fontSize};
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
