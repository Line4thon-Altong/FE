import styled from "styled-components";
import { Input } from "@/components/input";
import { LargeButton } from "@/components/large-button";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "@/components/alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SignupDetailsPage() {
  const [role, setRole] = useState<"owner" | "employee">("owner");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 새로 추가된 state (모달 관련)pen, set
  const [alertTitle, setAlertTitle] = useState(""); // 모달 제목
  const [alertDescription, setAlertDescription] = useState(""); // 모달 설명
  const [isError, setIsError] = useState(false); // 오류 여부 (성공/실패 구분용)

  const navigate = useNavigate();
  const SIGNUP_URL = "https://altong.store/api/auth/signup";

  const idError = useMemo(() => {
    if (id.trim() === "") return "";
    const isValid = /^[A-Za-z0-9]{1,8}$/.test(id);
    return isValid ? "" : "*8자 이내 올바른 형식으로 작성해주세요.";
  }, [id]);

  const passwordError = useMemo(() => {
    if (password.trim() === "") return "";
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(password);
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

  // 회원가입 요청
  const handleSignup = async () => {
    try {
      const payload =
        role === "owner"
          ? {
              role: "OWNER",
              username: id,
              password: password,
              name: null,
              storeName: storeName,
            }
          : {
              role: "EMPLOYEE",
              username: id,
              password: password,
              name: name,
              storeName: null,
            };

      console.log("회원가입 요청:", payload);

      const response = await axios.post(SIGNUP_URL, payload);

      if (response.status === 200 || response.status === 201) {
        // 성공
        setAlertTitle("가입 완료");
        setAlertDescription("‘알통’ 회원가입이 완료되었습니다.");
        setIsError(false);
        setIsAlertOpen(true);
      } else {
        // 비정상 응답
        setAlertTitle("오류 발생");
        setAlertDescription("회원가입 중 문제가 발생했습니다.");
        setIsError(true);
        setIsAlertOpen(true);
      }
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      setAlertTitle("오류 발생");
      setAlertDescription(
        error.response?.data?.message || "서버와의 통신 중 오류가 발생했습니다."
      );
      setIsError(true);
      setIsAlertOpen(true);
    }
  };
  const handleAlertClose = () => {
    setIsAlertOpen(false); // 모달 닫기

    if (!isError) {
      // 성공한 경우만 로그인으로 이동

      navigate("/login");
    }
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title={alertTitle}
          description={alertDescription}
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
