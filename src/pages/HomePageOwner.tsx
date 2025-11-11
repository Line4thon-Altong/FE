// src/pages/HomePageOwner.jsx
import axios from "axios";
import { HomeContent } from "./HomeContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function HomePageOwner() {
  const navigate = useNavigate();

  const handleEmployeeManage = () => navigate("/employee-management");
  const handleCreateEducation = () => navigate("/education-management");
  const [employeeCount, setEmployeeCount] = useState(0);
  const [educationItems, setEducationItems] = useState([]);
  const [error, setError] = useState(null);

  // const educationItems = [
  //   { title: "교육 1", date: "2025.01.01" },
  //   { title: "교육 2", date: "2025.01.01" },
  //   { title: "교육 3", date: "2025.01.01" },
  //   { title: "교육 4", date: "2025.01.01" },
  // ];

  // "2025-11-11 05:27" -> "2025.11.11"
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
          "https://altong.store/api/trainings/dashboard/owner",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          }
        );

        // 응답: { code, message, data: { employeeCount, trainings } }
        const apiData = res?.data?.data;
        const ec = apiData?.employeeCount ?? 0;
        const ts = Array.isArray(apiData?.trainings) ? apiData.trainings : [];

        setEmployeeCount(ec);
        setEducationItems(
          ts.map((t) => ({
            id: t.id,
            title: t.title,
            date: formatDate(t.createdAt),
          }))
        );
      } catch (e) {
        console.error(e);
        if (e.response?.status === 401) {
          console.warn("401 Unauthorized - 토큰 만료 또는 유효하지 않음");
          navigate("/login");
          return;
        }
        setError("대시보드 데이터를 불러오지 못했습니다.");
      }
    };

    fetchDashboardData();
  }, []);
  const handleEducationClick = (id) => {
    navigate(`/education-details/${id}`);
  };

  return (
    <HomeContent
      userType="owner"
      employeeCount={employeeCount}
      educationItems={educationItems}
      onEmployeeManageClick={handleEmployeeManage}
      onCreateEducationClick={handleCreateEducation}
      onEducationClick={handleEducationClick}
    />
  );
}
