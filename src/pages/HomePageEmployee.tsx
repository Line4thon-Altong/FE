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

  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

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

    if (data.code === "SUCCESS") {
      // 정상 출근 처리
      setCheckInTime(formatTime(data.data.startTime));
      setIsCheckedIn(true);
      setShowCheckInModal(true);
    } else {
      // 에러 모달 띄우기
      setErrorDescription(data.message); // "이미 출근 처리되었습니다."
      setErrorTitle("출퇴근 실패");
      setIsErrorAlertOpen(true);
    }
  };
  ///퇴근하기 클릭
  const handleCheckOut = async () => {
    const data = await requestCheck(
      "https://altong.store/api/employees/me/schedules/check-out"
    );

    if (!data) return;

    if (data.code === "SUCCESS") {
      // 정상 퇴근 처리
      setCheckOutTime(formatTime(data.data.endTime));
      setIsCheckedIn(true);
      setShowCheckOutModal(true);
    } else {
      // 에러 모달 띄우기
      setErrorDescription(data.message); // "이미 퇴근 처리되었습니다."
      setErrorTitle("출퇴근 실패");
      setIsErrorAlertOpen(true);
    }
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
        {}, // ← PATCH는 body 자리에 빈 객체 넣어야 함
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.data) {
        // 백엔드에서 보낸 message, code 포함
        return error.response.data;
      } else {
        return { code: "UNKNOWN", message: "출퇴근 요청 실패." };
      }
    }
  };

  function formatTime(timeString: string) {
    if (!timeString) return null;
    return timeString.split(".")[0].slice(0, 5);
  }

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
      {isErrorAlertOpen && (
        <Alert
          title={errorTitle}
          description={errorDescription}
          alertType="alert"
          onClose={() => setIsErrorAlertOpen(false)}
        />
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
