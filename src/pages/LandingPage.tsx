import styled from "styled-components";
import { theme } from "@/styles/theme";
import LogoContainer from "@/assets/logos/logo_container";

export function LandingPage() {
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
