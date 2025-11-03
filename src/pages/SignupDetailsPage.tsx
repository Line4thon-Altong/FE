import styled from "styled-components";
import { Input } from "@/components/input";
import { LargeButton } from "@/components/large-button";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "@/components/alert";
import { useNavigate } from "react-router-dom";

export function SignupDetailsPage() {
  const [role, setRole] = useState<"owner" | "employee">("owner");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const idError = useMemo(() => {
    if (id.trim() === "") return "";
    const isValid = /^[A-Za-z0-9]{1,8}$/.test(id);
    return isValid ? "" : "*올바른 형식으로 작성해주세요.";
  }, [id]);

  const passwordError = useMemo(() => {
    if (password.trim() === "") return "";
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(password);
    return isValid ? "" : "*영문, 숫자를 포함해 8~12자 이내로 작성해주세요.";
  }, [password]);

  const passwordCheckError = useMemo(() => {
    if (passwordCheck.trim() === "") return "";
    return password === passwordCheck ? "" : "*비밀번호가 일치하지 않습니다.";
  }, [password, passwordCheck]);

  const isSignupDisabled = useMemo(() => {
    const isAnyEmpty =
      (role === "owner" && storeName.trim() === "") ||
      (role === "employee" && name.trim() === "") ||
      id.trim() === "" ||
      password.trim() === "" ||
      passwordCheck.trim() === "";
    const hasError = Boolean(idError || passwordError || passwordCheckError);
    return isAnyEmpty || hasError;
  }, [
    role,
    name,
    storeName,
    id,
    password,
    passwordCheck,
    idError,
    passwordError,
    passwordCheckError,
  ]);

  useEffect(() => {
    const userType = localStorage.getItem("usertype");
    if (userType === "owner") {
      setRole("owner");
    } else {
      setRole("employee");
    }
  }, []);

  const handleSignup = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false); // 모달 닫기

    //localStorage에서 userType 읽기
    const userType = localStorage.getItem("userType");

    //역할에 맞게 홈으로 이동
    if (userType === "owner") {
      navigate("/home/owner");
    } else {
      navigate("/home/employee");
    }
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title="가입 완료"
          description="‘알통’ 회원가입이 완료되었습니다."
          alertType="alert"
          onClose={handleAlertClose}
        />
      )}
      <FormWrapper>
        {role === "owner" ? (
          <Input
            placeholder="상호명"
            type="text"
            title="상호명"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        ) : (
          <Input
            placeholder="이름"
            type="text"
            title="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          placeholder="영문, 숫자 8자 이내"
          type="text"
          title="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          errorText={idError}
        />
        <Input
          placeholder="영문, 숫자를 포함한 6~12자 이내"
          type="password"
          title="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorText={passwordError}
        />
        <Input
          placeholder="비밀번호 확인"
          type="password"
          title="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          errorText={passwordCheckError}
        />
      </FormWrapper>
      <LargeButton
        text="가입하기"
        onClick={handleSignup}
        disabled={isSignupDisabled}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 26px 21px 58px 21px;
  align-items: center;
  justify-content: space-between;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 19px;
  gap: 26px;
  margin-bottom: 91px;
`;
