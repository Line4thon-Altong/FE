// src/pages/HomePageEmployee.jsx
import { useState } from "react";
import { HomeContent } from "./HomeContent";
import { Alert } from "@/components/alert";
import styled from "styled-components";

export function HomePageEmployee() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);

  // 모달 닫기
  const handleCloseModal = () => {
    if (showCheckInModal) setShowCheckInModal(false);
    if (showCheckOutModal) setShowCheckOutModal(false);
  };
  //출근하기 클릭
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setShowCheckInModal(true);
  };
  ///퇴근하기 클릭
  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setShowCheckOutModal(true);
  };

  const educationItems = [
    { title: "위생 교육", date: "2025.01.01" },
    { title: "POS 사용법", date: "2025.01.05" },
    { title: "위생 교육", date: "2025.01.01" },
    { title: "POS 사용법", date: "2025.01.05" },
  ];

  return (
    <>
      {showCheckInModal && (
        <AlertWrapper>
          <Alert
            title="출근 완료"
            description="8:53 출근 완료!"
            alertType="alert"
            onClose={handleCloseModal}
          />
        </AlertWrapper>
      )}
      {showCheckOutModal && (
        <AlertWrapper>
          <Alert
            title="퇴근 완료"
            description="9:53 퇴근 완료!"
            alertType="alert"
            onClose={handleCloseModal}
          />
        </AlertWrapper>
      )}
      <HomeContent
        userType="employee"
        educationItems={educationItems}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        isCheckedIn={isCheckedIn}
      />
    </>
  );
}

//모달이 헤더 높이만큼 아래로 밀려서 보정함
const AlertWrapper = styled.div`
  position: fixed; /*  화면 전체 기준으로 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* 헤더보다 위로 */
`;
