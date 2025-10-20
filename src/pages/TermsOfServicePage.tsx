import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Button } from "@/components/button";
import CheckIcon from "@/assets/icons/ic_check";
import CheckFillIcon from "@/assets/icons/ic_check-fill";
import NextIcon from "@/assets/icons/ic_next";
import { useState, useEffect } from "react";

export function TermsOfServicePage() {
  const [isAllAgree, setIsAllAgree] = useState(false);
  const [isTermsOfServiceAgree, setIsTermsOfServiceAgree] = useState(false);
  const [isPrivacyPolicyAgree, setIsPrivacyPolicyAgree] = useState(false);
  const [isThirdPartyAgree, setIsThirdPartyAgree] = useState(false);
  const [isEventAgree, setIsEventAgree] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      isAllAgree ||
      (isTermsOfServiceAgree && isPrivacyPolicyAgree && isThirdPartyAgree)
    ) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
    if (
      isTermsOfServiceAgree &&
      isPrivacyPolicyAgree &&
      isThirdPartyAgree &&
      isEventAgree
    ) {
      setIsAllAgree(true);
    } else {
      setIsAllAgree(false);
    }
  }, [
    isAllAgree,
    isTermsOfServiceAgree,
    isPrivacyPolicyAgree,
    isThirdPartyAgree,
    isEventAgree,
  ]);

  const handleAllAgree = () => {
    setIsAllAgree((prev) => {
      const state = !prev;
      setIsTermsOfServiceAgree(state);
      setIsPrivacyPolicyAgree(state);
      setIsThirdPartyAgree(state);
      setIsEventAgree(state);
      return state;
    });
  };

  const handleTermsOfServiceAgree = () => {
    setIsTermsOfServiceAgree(!isTermsOfServiceAgree);
  };

  const handlePrivacyPolicyAgree = () => {
    setIsPrivacyPolicyAgree(!isPrivacyPolicyAgree);
  };

  const handleThirdPartyAgree = () => {
    setIsThirdPartyAgree(!isThirdPartyAgree);
  };

  const handleEventAgree = () => {
    setIsEventAgree(!isEventAgree);
  };

  return (
    <Container>
      <AgreeWrapper>
        <AllAgreeContainer onClick={handleAllAgree}>
          <CheckFillIcon
            width={28}
            height={28}
            color={isAllAgree ? theme.colors.main : theme.colors.gray2}
          />
          <AllAgreeText>모든 약관에 동의합니다.</AllAgreeText>
        </AllAgreeContainer>
        <Line />
        <AgreeContainer>
          <AgreeItem>
            <LeftSection onClick={handleTermsOfServiceAgree}>
              <CheckIcon
                width={16}
                height={16}
                color={
                  isTermsOfServiceAgree ? theme.colors.main : theme.colors.gray2
                }
              />
              <AgreeText>
                서비스 이용약관{" "}
                <span style={{ color: theme.colors.main }}>(필수)</span>
              </AgreeText>
            </LeftSection>
            <NextIconButton>
              <NextIcon width={16} height={16} color={theme.colors.gray3} />
            </NextIconButton>
          </AgreeItem>
          <AgreeItem>
            <LeftSection onClick={handlePrivacyPolicyAgree}>
              <CheckIcon
                width={16}
                height={16}
                color={
                  isPrivacyPolicyAgree ? theme.colors.main : theme.colors.gray2
                }
              />
              <AgreeText>
                개인정보 처리방침{" "}
                <span style={{ color: theme.colors.main }}>(필수)</span>
              </AgreeText>
            </LeftSection>
            <NextIconButton>
              <NextIcon width={16} height={16} color={theme.colors.gray3} />
            </NextIconButton>
          </AgreeItem>
          <AgreeItem>
            <LeftSection onClick={handleThirdPartyAgree}>
              <CheckIcon
                width={16}
                height={16}
                color={
                  isThirdPartyAgree ? theme.colors.main : theme.colors.gray2
                }
              />
              <AgreeText>
                제 3자 제공 동의{" "}
                <span style={{ color: theme.colors.main }}>(필수)</span>
              </AgreeText>
            </LeftSection>
            <NextIconButton>
              <NextIcon width={16} height={16} color={theme.colors.gray3} />
            </NextIconButton>
          </AgreeItem>
          <AgreeItem>
            <LeftSection onClick={handleEventAgree}>
              <CheckIcon
                width={16}
                height={16}
                color={isEventAgree ? theme.colors.main : theme.colors.gray2}
              />
              <AgreeText>혜택 이벤트 알림 수신동의 (선택)</AgreeText>
            </LeftSection>
            <NextIconButton>
              <NextIcon width={16} height={16} color={theme.colors.gray3} />
            </NextIconButton>
          </AgreeItem>
        </AgreeContainer>
      </AgreeWrapper>

      <Button
        text="다음으로"
        onClick={() => {}}
        disabled={isNextButtonDisabled}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 72px 21px 58px 21px;
  align-items: center;
  justify-content: space-between;
`;

const AgreeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const AllAgreeContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  padding-left: 5px;
  outline: none;
`;

const AllAgreeText = styled.div`
  font-size: ${theme.texts.h3.fontSize};
  font-weight: ${theme.texts.h3.fontWeight};
  line-height: ${theme.texts.h3.lineHeight};
  color: ${theme.colors.gray2};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.main};
  margin-top: 20px;
  margin-bottom: 23px;
`;

const AgreeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 7px;
`;

const AgreeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

const AgreeText = styled.div`
  font-size: ${theme.texts.body3.fontSize};
  font-weight: ${theme.texts.body3.fontWeight};
  line-height: ${theme.texts.body3.lineHeight};
  color: ${theme.colors.gray2};
`;

const NextIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;
