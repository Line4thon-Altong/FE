import { theme } from "@/styles/theme";
import styled from "styled-components";

export function SmallButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return <SmallButtonWrapper onClick={onClick}>{text}</SmallButtonWrapper>;
}

const SmallButtonWrapper = styled.button`
  background-color: ${theme.colors.main};
  color: ${theme.colors.white};
  padding: 6px 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
`;
