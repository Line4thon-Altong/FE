import styled from "styled-components";
import { LargeButton } from "@/components/large-button";
import { theme } from "@/styles/theme";
import { useMemo, useState } from "react";
import { Alert } from "@/components/alert";

export function EmployeeAddPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
  };

  const isAddDisabled = useMemo(() => {
    return employeeId.trim() === "";
  }, [employeeId]);

  const handleAddEmployee = () => {
    setIsAlertOpen(true);
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title="추가 완료"
          description="알바생을 추가했습니다."
          alertType="alert"
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
