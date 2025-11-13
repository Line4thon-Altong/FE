// src/pages/HomePageEmployee.jsx
import { useState, useEffect } from "react";
import { HomeContent } from "./HomeContent";
import { Alert } from "@/components/alert";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export function HomePageEmployee() {
  const navigate = useNavigate();
  const [educationItems, setEducationItems] = useState([]);
  const [error, setError] = useState(null);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  // 모달 닫기
  const handleCloseModal = () => {
    if (showCheckInModal) setShowCheckInModal(false);
    if (showCheckOutModal) setShowCheckOutModal(false);
  };
  // 출근 버튼 클릭
  const handleCheckIn = async () => {
    const data = await requestCheck(
      "https://altong.store/api/employees/me/schedules/check-in"
    );

    if (!data) return;
    if (data.startTime) setCheckInTime(data.startTime);

    setIsCheckedIn(true); // UI 상태 변경
    setShowCheckInModal(true); // 출근 완료 모달 오픈
  };
  ///퇴근하기 클릭
  const handleCheckOut = async () => {
    const data = await requestCheck(
      "https://altong.store/api/employees/me/schedules/check-out"
    );

    if (!data) return;
    if (data.endTime) setCheckOutTime(data.endTime);

    setIsCheckedIn(false);
    setShowCheckOutModal(true);
  };

  // 공통 axios 요청
  const requestCheck = async (url) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.patch(
        url,

        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (err) {
      console.error("출퇴근 요청 실패:", err);
    }
  };

  const formatDate = (s) => {
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
        setError(null);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
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

        // 응답: { code, message, data: { employeeCount, trainings } }
        const apiData = res?.data?.data;
        const ts = Array.isArray(apiData?.trainings) ? apiData.trainings : [];

        setEducationItems(
          ts.map((t) => ({
            id: t.id,
            title: t.title,
            date: formatDate(t.createdAt),
          }))
        );
      } catch (e) {
        if (e.response?.status === 401) {
          console.warn("401 Unauthorized - 토큰 만료 또는 유효하지 않음");
          navigate("/login");
          return;
        }
        console.error(e);
        setError("대시보드 데이터를 불러오지 못했습니다.");
      }
    };

    fetchDashboardData();
  }, []);
  const handleEducationClick = (id) => {
    navigate(`/education-details/${id}`);
  };

  return (
    <>
      {showCheckInModal && (
        <AlertWrapper>
          <Alert
            title="출근 완료"
            description={`${checkInTime || ""} 출근 완료!`}
            alertType="alert"
            onClose={handleCloseModal}
          />
        </AlertWrapper>
      )}
      {showCheckOutModal && (
        <AlertWrapper>
          <Alert
            title="퇴근 완료"
            description={`${checkOutTime || ""} 퇴근 완료!`}
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
