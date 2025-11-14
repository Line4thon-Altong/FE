import styled from "styled-components";
import { theme } from "@/styles/theme";
import LogoContainer from "@/assets/logos/logo_container";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const accessToken = localStorage.getItem("accessToken");
      
      if (accessToken) {
        // 토큰이 있으면 usertype에 따라 home으로 이동
        const usertype = localStorage.getItem("usertype");
        if (usertype === "owner") {
          navigate("/home/owner");
        } else {
          navigate("/home/employee");
        }
      } else {
        // 토큰이 없으면 로그인 페이지로 이동
        navigate("/login");
      }
    }, 3000); // 3초 후 실행

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <LogoContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0 92px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${theme.colors.logo};
`;
