import styled from "styled-components";
import ScheduleIcon from "@/assets/icons/ic_schedule";
import EducationIcon from "@/assets/icons/ic_education";
import PersonIcon from "@/assets/icons/ic_person";
import { theme } from "@/styles/theme";
import { useState } from "react";
export function Navigation() {
  const [activeItem, setActiveItem] = useState<
    "schedule" | "education" | "myPage"
  >("education");
  const handleClick = (item: "schedule" | "education" | "myPage") => {
    setActiveItem(item);
  };
  return (
    <FooterWrapper>
      <FooterItem onClick={() => handleClick("schedule")}>
        <ScheduleIcon
          width={39}
          height={39}
          color={
            activeItem === "schedule" ? theme.colors.main : theme.colors.gray3
          }
        />
        <FooterItemText $isActive={activeItem === "schedule"}>
          스케줄
        </FooterItemText>
      </FooterItem>
      <FooterItem onClick={() => handleClick("education")}>
        <EducationIcon
          width={39}
          height={39}
          color={
            activeItem === "education" ? theme.colors.main : theme.colors.gray3
          }
        />
        <FooterItemText $isActive={activeItem === "education"}>
          교육
        </FooterItemText>
      </FooterItem>
      <FooterItem onClick={() => handleClick("myPage")}>
        <PersonIcon
          width={39}
          height={39}
          color={
            activeItem === "myPage" ? theme.colors.main : theme.colors.gray3
          }
        />
        <FooterItemText $isActive={activeItem === "myPage"}>
          마이페이지
        </FooterItemText>
      </FooterItem>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  padding: 21px 70px;
  gap: 90px;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.effects.effect3};
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: ${theme.colors.white};
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const FooterItemText = styled.div<{ $isActive: boolean }>`
  font-size: ${theme.texts.navigation.fontSize};
  font-weight: ${theme.texts.navigation.fontWeight};
  line-height: ${theme.texts.navigation.lineHeight};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.main : theme.colors.gray3};
  white-space: nowrap;
`;
