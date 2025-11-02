// src/pages/HomePageOwner.jsx
import { HomeContent } from "./HomeContent";
import { useNavigate } from "react-router-dom";

export function HomePageOwner() {
  const navigate = useNavigate();

  const handleEmployeeManage = () => navigate("/employee-management");
  const handleCreateEducation = () => navigate("/education-management");

  const educationItems = [
    { title: "교육 1", date: "2025.01.01" },
    { title: "교육 2", date: "2025.01.01" },
    { title: "교육 3", date: "2025.01.01" },
    { title: "교육 4", date: "2025.01.01" },
  ];

  return (
    <HomeContent
      userType="owner"
      employeeCount={0}
      educationItems={educationItems}
      onEmployeeManageClick={handleEmployeeManage}
      onCreateEducationClick={handleCreateEducation}
    />
  );
}
