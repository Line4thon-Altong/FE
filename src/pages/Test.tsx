import styled from "styled-components";
import { theme } from "../styles/theme";

export function Test() {
  return (
    <TestContainer>
      <H1>h1</H1>
      <H2>h2</H2>
      <H3>h3</H3>
      <H4>h4</H4>
      <Body1>body1</Body1>
      <Body2>body2</Body2>
      <Body3>body3</Body3>
      <Body4>body4</Body4>
      <Body5>body5</Body5>
      <Body6>body6</Body6>
      <Body7>body7</Body7>
      <Body8>body8</Body8>
      <Subtitle1>subtitle1</Subtitle1>
      <Subtitle2>subtitle2</Subtitle2>
      <Subtitle3>subtitle3</Subtitle3>
      <Navigation>navigation</Navigation>
      <Date>date</Date>
      <Logo>logo</Logo>
      <LogoDeactivation>logo_deactivation</LogoDeactivation>
      <Main>main</Main>
      <Sub1>sub1</Sub1>
      <Sub2>sub2</Sub2>
      <Sub3>sub3</Sub3>
      <Sub4>sub4</Sub4>
      <Gray1>gray1</Gray1>
      <Gray2>gray2</Gray2>
      <Gray3>gray3</Gray3>
      <Gray4>gray4</Gray4>
      <Gray5>gray5</Gray5>
      <Gray6>gray6</Gray6>
      <White>white</White>
      <Negative>negative</Negative>
      <Effect1>effect1</Effect1>
      <Effect2>effect2</Effect2>
      <Effect3>effect3</Effect3>
    </TestContainer>
  );
}

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const H1 = styled.div`
  font-size: ${theme.texts.h1.fontSize};
  font-weight: ${theme.texts.h1.fontWeight};
  line-height: ${theme.texts.h1.lineHeight};
`;

const H2 = styled.div`
  font-size: ${theme.texts.h2.fontSize};
  font-weight: ${theme.texts.h2.fontWeight};
  line-height: ${theme.texts.h2.lineHeight};
`;

const H3 = styled.div`
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
`;
const H4 = styled.div`
  font-size: ${theme.texts.h4.fontSize};
  font-weight: ${theme.texts.h4.fontWeight};
  line-height: ${theme.texts.h4.lineHeight};
`;

const Body1 = styled.div`
  font-size: ${theme.texts.body1.fontSize};
  font-weight: ${theme.texts.body1.fontWeight};
  line-height: ${theme.texts.body1.lineHeight};
`;

const Body2 = styled.div`
  font-size: ${theme.texts.body2.fontSize};
  font-weight: ${theme.texts.body2.fontWeight};
  line-height: ${theme.texts.body2.lineHeight};
`;

const Body3 = styled.div`
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
`;

const Body4 = styled.div`
  font-size: ${theme.texts.body4.fontSize};
  font-weight: ${theme.texts.body4.fontWeight};
  line-height: ${theme.texts.body4.lineHeight};
`;

const Body5 = styled.div`
  font-size: ${theme.texts.body5.fontSize};
  font-weight: ${theme.texts.body5.fontWeight};
  line-height: ${theme.texts.body5.lineHeight};
`;

const Body6 = styled.div`
  font-size: ${theme.texts.body6.fontSize};
  font-weight: ${theme.texts.body6.fontWeight};
  line-height: ${theme.texts.body6.lineHeight};
`;

const Body7 = styled.div`
  font-size: ${theme.texts.body7.fontSize};
  font-weight: ${theme.texts.body7.fontWeight};
  line-height: ${theme.texts.body7.lineHeight};
`;

const Body8 = styled.div`
  font-size: ${theme.texts.body8.fontSize};
  font-weight: ${theme.texts.body8.fontWeight};
  line-height: ${theme.texts.body8.lineHeight};
`;

const Subtitle1 = styled.div`
  font-size: ${theme.texts.subtitle1.fontSize};
  font-weight: ${theme.texts.subtitle1.fontWeight};
  line-height: ${theme.texts.subtitle1.lineHeight};
`;

const Subtitle2 = styled.div`
  font-size: ${theme.texts.subtitle2.fontSize};
  font-weight: ${theme.texts.subtitle2.fontWeight};
  line-height: ${theme.texts.subtitle2.lineHeight};
`;

const Subtitle3 = styled.div`
  font-size: ${theme.texts.subtitle3.fontSize};
  font-weight: ${theme.texts.subtitle3.fontWeight};
  line-height: ${theme.texts.subtitle3.lineHeight};
`;

const Navigation = styled.div`
  font-size: ${theme.texts.navigation.fontSize};
  font-weight: ${theme.texts.navigation.fontWeight};
  line-height: ${theme.texts.navigation.lineHeight};
`;

const Date = styled.div`
  font-size: ${theme.texts.date.fontSize};
  font-weight: ${theme.texts.date.fontWeight};
  line-height: ${theme.texts.date.lineHeight};
`;

const Logo = styled.div`
  background: ${theme.colors.logo};
`;

const LogoDeactivation = styled.div`
  background: ${theme.colors.logo_deactivation};
`;

const Main = styled.div`
  background-color: ${theme.colors.main};
`;

const Sub1 = styled.div`
  background-color: ${theme.colors.sub1};
`;

const Sub2 = styled.div`
  background-color: ${theme.colors.sub2};
`;

const Sub3 = styled.div`
  background-color: ${theme.colors.sub3};
`;

const Sub4 = styled.div`
  background-color: ${theme.colors.sub4};
`;

const Gray1 = styled.div`
  background-color: ${theme.colors.gray1};
`;

const Gray2 = styled.div`
  background-color: ${theme.colors.gray2};
`;

const Gray3 = styled.div`
  background-color: ${theme.colors.gray3};
`;

const Gray4 = styled.div`
  background-color: ${theme.colors.gray4};
`;

const Gray5 = styled.div`
  background-color: ${theme.colors.gray5};
`;

const Gray6 = styled.div`
  background-color: ${theme.colors.gray6};
`;

const White = styled.div`
  background-color: ${theme.colors.white};
`;

const Negative = styled.div`
  background-color: ${theme.colors.negative};
`;

const Effect1 = styled.div`
  box-shadow: ${theme.effects.effect1};
`;

const Effect2 = styled.div`
  box-shadow: ${theme.effects.effect2};
`;

const Effect3 = styled.div`
  box-shadow: ${theme.effects.effect3};
`;
