import axios from "axios";

import { useState, useEffect } from "react";
import { HomeContent } from "./HomeContent";
import { Alert } from "@/components/alert";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function HomePageEmployee() {
  const navigate = useNavigate();

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [educationItems, setEducationItems] = useState<
    { id: number; title: string; date: string }[]
  >([]);

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

  // "2025-11-11 05:27" -> "2025.11.11"
  const formatDate = (s: string) => {
    if (!s) return "";
    const d = new Date(s.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return s; // 파싱 실패 시 원문 유지
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("로그인이 필요합니다.");

          return;
        }

        const res = await axios.get(
          "https://altong.store/api/trainings/dashboard/employee",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          }
        );

        // 응답: { code, message, data: { trainings } }

        const apiData = res?.data?.data;
        const ts = Array.isArray(apiData?.trainings) ? apiData.trainings : [];

        setEducationItems(
          ts.map((t: { id: number; title: string; createdAt: string }) => ({
            id: t.id,
            title: t.title,
            date: formatDate(t.createdAt),
          }))
        );
      } catch (e: unknown) {
        console.error("대시보드 데이터를 불러오지 못했습니다:", e);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEducationClick = (id: number, title: string) => {
    navigate(`/education-details/${id}`, { state: { title } });
  };

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
        onEducationClick={handleEducationClick}
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
