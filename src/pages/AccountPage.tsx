import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { LargeButton } from "@/components/large-button";
import { Alert } from "@/components/alert";
import axios from "axios";

export function AccountPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [userInfo, setUserInfo] = useState<{
    storeName?: string;
    username?: string;
  } | null>(null);

  // 변경 비밀번호 검증: 영문과 숫자를 포함하고 6~12자 사이
  const isNewPasswordValid = (password: string) => {
    if (password.length < 6 || password.length > 12) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  };

  // 비밀번호 일치 여부 확인
  const isPasswordMatch = newPassword === confirmPassword;

  const isPasswordFormValid =
    currentPassword.trim() &&
    isNewPasswordValid(newPassword) &&
    confirmPassword.trim() &&
    isPasswordMatch;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        const response = await axios.get("https://altong.store/api/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("User info fetch failed:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // 연동 끊기 기능 추가 필요 api 수정 후 착수
  // const handleDisconnectClick = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //   } catch (error) {
  //     console.error("Disconnect failed:", error);
  //     if (axios.isAxiosError(error) && error.response) {
  //       const message =
  //         error.response.data?.message || "연동 끊기 중 오류가 발생했습니다.";
  //       setAlertTitle("오류 발생");
  //       setAlertDescription(message);
  //     } else {
  //       setAlertTitle("오류 발생");
  //       setAlertDescription("서버와의 통신 중 오류가 발생했습니다.");
  //     }
  //     setIsAlertOpen(true);
  //   }
  // };

  const handlePasswordChange = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setAlertTitle("오류 발생");
        setAlertDescription("로그인이 필요합니다.");
        setIsAlertOpen(true);
        return;
      }

      const response = await axios.patch(
        localStorage.getItem("usertype") === "owner"
          ? "https://altong.store/api/owners/password"
          : "https://altong.store/api/employees/password",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setAlertTitle("변경 완료");
        setAlertDescription("비밀번호 변경이 완료되었습니다.");
        setIsAlertOpen(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message ||
          "비밀번호 변경 중 오류가 발생했습니다.";
        setAlertTitle("오류 발생");
        setAlertDescription(message);
      } else {
        setAlertTitle("오류 발생");
        setAlertDescription("서버와의 통신 중 오류가 발생했습니다.");
      }
      setIsAlertOpen(true);
    }
  };

  const handleStoreNameChange = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setAlertTitle("오류 발생");
        setAlertDescription("로그인이 필요합니다.");
        setIsAlertOpen(true);
        return;
      }

      const response = await axios.patch(
        "https://altong.store/api/owners/store-name",
        {
          storeName: storeName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // localStorage에 storeName 업데이트
        localStorage.setItem("storeName", storeName);
        setAlertTitle("변경 완료");
        setAlertDescription("상호명 변경이 완료되었습니다.");
        setIsAlertOpen(true);
        setStoreName("");
      }
    } catch (error) {
      console.error("상호명 변경 실패:", error);
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message || "상호명 변경 중 오류가 발생했습니다.";
        setAlertTitle("오류 발생");
        setAlertDescription(message);
      } else {
        setAlertTitle("오류 발생");
        setAlertDescription("서버와의 통신 중 오류가 발생했습니다.");
      }
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      {isAlertOpen && (
        <Alert
          title={alertTitle}
          description={alertDescription}
          alertType="alert"
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      <Container>
        <ContentWrapper>
          <Title>비밀번호 변경</Title>
          <Content>
            <Input
              title="현재 비밀번호"
              placeholder="현재 비밀번호"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              title="변경 비밀번호"
              placeholder="영문, 숫자를 포함한 6자~12자 이내"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              title="변경 비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Content>
          <LargeButton
            text="변경하기"
            textType="others"
            onClick={handlePasswordChange}
            disabled={!isPasswordFormValid}
          />
        </ContentWrapper>
        <ContentWrapper>
          <Title>
            {localStorage.getItem("usertype") === "owner"
              ? "상호명 변경"
              : "연동된 가게 정보"}
          </Title>
          <Content>
            <Input
              title="상호명"
              placeholder={userInfo?.storeName || "상호명"}
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Content>
          <LargeButton
            text={
              localStorage.getItem("usertype") === "owner"
                ? "변경하기"
                : "연동 끊기"
            }
            onClick={
              localStorage.getItem("usertype") === "owner"
                ? handleStoreNameChange
                : () => {}
              // : handleDisconnectClick
            }
            disabled={!storeName.trim()}
          />
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 40px;
  gap: 76px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 25px;
`;

const Title = styled.div`
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  line-height: ${theme.texts.subtitle1.lineHeight};
  color: ${theme.colors.gray1};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
