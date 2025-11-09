import styled from "styled-components";
import { LargeButton } from "@/components/large-button";
import { theme } from "@/styles/theme";
import { useMemo, useState } from "react";
import { Alert } from "@/components/alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function EmployeeAddPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const URL = "https://altong.store/api/employees";
  const navigate = useNavigate();
  const [alertTitle, setAlertTitle] = useState(""); // 모달 제목
  const [alertDescription, setAlertDescription] = useState(""); // 모달 설명
  const [onAlertConfirm, setOnAlertConfirm] = useState<() => void>(
    () => () => {}
  );

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
  };

  const isAddDisabled = useMemo(() => {
    return employeeId.trim() === "";
  }, [employeeId]);

  const handleAddEmployee = async () => {
    try {
      const payload = {
        message: employeeId,
      };

      console.log("알바생 추가 요청:", payload);

      // localStorage에서 토큰 가져오기
      const token = localStorage.getItem("accessToken");

      // 토큰이 없을 경우 예외 처리
      if (!token) {
        setAlertTitle("로그인 필요");
        setAlertDescription("토큰이 없습니다. 다시 로그인해주세요.");

        setOnAlertConfirm(() => () => {
          setIsAlertOpen(false);
          navigate("/login");
        });

        setIsAlertOpen(true);
        return;
      }

      // 헤더에 Authorization 추가
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        // 성공
        setAlertTitle("추가 완료 완료");
        setAlertDescription("알바생을 추가했습니다.");
        setOnAlertConfirm(() => () => setIsAlertOpen(false));
        setIsAlertOpen(true);
      } else {
        // 비정상 응답
        setAlertTitle("추가 실패");
        setAlertDescription("유효한 알바생이 없습니다.");
        setOnAlertConfirm(() => () => setIsAlertOpen(false));
        setIsAlertOpen(true);
      }
    } catch (error: any) {
      console.error("추가 실패:", error);
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        // 인증 문제 (토큰 만료 or 권한 없음)
        setAlertTitle("로그인 만료");
        setAlertDescription("세션이 만료되었습니다. 다시 로그인해주세요.");
        setIsAlertOpen(true);

        // 모달 표시 후 로그인 페이지로 이동
        setOnAlertConfirm(() => () => {
          setIsAlertOpen(false);
          navigate("/login");
        });
        setIsAlertOpen(true);

        // 토큰 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return;
      }

      // 그 외 서버 오류 (500 등)
      setAlertTitle("오류 발생");
      setAlertDescription(
        error.response?.data?.message || "서버와의 통신 중 오류가 발생했습니다."
      );
      setOnAlertConfirm(() => () => setIsAlertOpen(false));
      setIsAlertOpen(true);
    }
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title={alertTitle}
          description={alertDescription}
          alertType="alert"
          onConfirm={onAlertConfirm} // 확인 버튼 눌렀을 때 실행
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      <Content>
        <EmployeeAddForm>
          <EmployeeAddFormTitle>
            교육을 공유할 알바생을 추가해주세요.
          </EmployeeAddFormTitle>
          <EmployeeAddFormItem>
            <EmployeeAddFormItemTitle>알바생 아이디</EmployeeAddFormItemTitle>
            <EmployeeAddFormItemInput
              type="text"
              placeholder="가입 시 입력했던 아이디를 입력해주세요."
              value={employeeId}
              onChange={handleEmployeeIdChange}
            />
          </EmployeeAddFormItem>
        </EmployeeAddForm>
        <LargeButton
          text="추가하기"
          disabled={isAddDisabled}
          onClick={handleAddEmployee}
        />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 243px 20px 58px 20px;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const EmployeeAddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 37px;
  padding: 0 7px;
`;

const EmployeeAddFormTitle = styled.div`
  font-size: ${theme.texts.h1.fontSize};
  font-weight: ${theme.texts.h1.fontWeight};
  line-height: ${theme.texts.h1.lineHeight};
  color: ${theme.colors.gray1};
`;

const EmployeeAddFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const EmployeeAddFormItemTitle = styled.div`
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  color: ${theme.colors.gray2};
`;

const EmployeeAddFormItemInput = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray2};
  outline: none;
  width: 100%;
  padding-bottom: 12px;
  color: ${theme.colors.gray1};
  font-size: ${theme.texts.h2.fontSize};
  font-weight: ${theme.texts.h2.fontWeight};
  line-height: ${theme.texts.h2.lineHeight};

  &::placeholder {
    color: ${theme.colors.gray3};
    font-size: ${theme.texts.h2.fontSize};
    font-weight: ${theme.texts.h2.fontWeight};
    line-height: ${theme.texts.h2.lineHeight};
  }
`;
