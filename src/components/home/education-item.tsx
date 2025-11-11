import { theme } from "@/styles/theme";
import styled from "styled-components";
import ArrowRightIcon from "@/assets/icons/ic_arrow-right";
export function EducationItem({
  title,
  date,
  onClick,
}: {
  title: string;
  date: string;
  onClick?: () => void;
}) {
  return (
    <EducationItemWrapper onClick={onClick} style={{ cursor: "pointer" }}>
      <EducationItemTitle>
        <EducationItemTitleText>{title}</EducationItemTitleText>
        <EducationItemDate>{date}</EducationItemDate>
      </EducationItemTitle>
      <ArrowRightIcon width={6} height={10} color={theme.colors.main} />
    </EducationItemWrapper>
  );
}

const EducationItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.sub4};
  padding: 21px 18px;
  border-radius: 20px;
  border: 1px dashed ${theme.colors.main};
`;

const EducationItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const EducationItemTitleText = styled.div`
  font-size: ${theme.texts.body6.fontSize};
  font-weight: ${theme.texts.body6.fontWeight};
  line-height: ${theme.texts.body6.lineHeight};
  color: ${theme.colors.gray1};
`;

const EducationItemDate = styled.div`
  font-size: ${theme.texts.date.fontSize};
  font-weight: ${theme.texts.date.fontWeight};
  line-height: ${theme.texts.date.lineHeight};
  color: ${theme.colors.gray3};
`;
