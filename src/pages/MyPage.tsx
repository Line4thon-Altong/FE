import styled from "styled-components";
import { theme } from "@/styles/theme";
import StoreIcon from "@/assets/icons/ic_store";
import ArrowRightIcon from "@/assets/icons/ic_arrow-right";
import { Alert } from "@/components/alert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function MyPage() {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    storeName?: string;
    username?: string;
  } | null>(null);
  const handleAccountClick = () => {
    navigate("/mypage/account");
  };

  const handleLogoutClick = () => {
    setIsAlertOpen(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://altong.store/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUserInfo(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("User info fetch failed:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // 로그아웃 실행 함수
  const handleConfirmLogout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const userType = localStorage.getItem("userType");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.error("No refresh token found.");
        return;
      }

      // API endpoint 사장/직원 분기
      const endpoint =
        userType === "owner"
          ? "https://altong.store/api/owners/logout"
          : "https://altong.store/api/employees/logout";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        //  로컬스토리지 비우기
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("usertype");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("storeName");

        navigate("/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsProcessing(false);
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      {isAlertOpen && (
        <Alert
          title="로그아웃"
          description="로그아웃하시겠습니까?"
          alertType="delete"
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
      <Container>
        {/* 사장님 정보 */}
        <InfoContainer>
          <IconContainer>
            <StoreIcon width={45} height={45} />
          </IconContainer>
          <InfoTextContainer>
            <Title>{userInfo?.storeName}</Title>
            <Id>{userInfo?.username}</Id>
          </InfoTextContainer>
        </InfoContainer>
        {/* 리스트 */}
        <ListContainer>
          <ListItem onClick={handleAccountClick}>
            <div>계정</div>
            <ArrowRightIcon width={8} height={13} color={theme.colors.gray3} />
          </ListItem>
          <ListItem onClick={handleLogoutClick}>
            <div>로그아웃</div>
            <ArrowRightIcon width={8} height={13} color={theme.colors.gray3} />
          </ListItem>
        </ListContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 47px 30px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: ${theme.colors.main};
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 10px;
  margin-bottom: 33px;
`;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: ${theme.texts.h2.fontSize};
  font-weight: ${theme.texts.h2.fontWeight};
  line-height: ${theme.texts.h2.lineHeight};
  color: ${theme.colors.gray1};
`;
const Id = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: ${theme.texts.body8.fontWeight};
  line-height: ${theme.texts.body8.lineHeight};
  color: ${theme.colors.gray2};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 17px;
  background-color: ${theme.colors.white};
  padding: 10px 0px;
  box-shadow: ${theme.effects.effect4};
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  color: ${theme.colors.gray1};
  padding: 15px 30px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors.gray4};
  &:last-child {
    border: none;
  }
`;
