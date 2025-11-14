import { SearchBar } from "@/components/employee-management/search-bar";
import styled from "styled-components";
import { SmallButton } from "@/components/small-button";
import { EmployeeItem } from "@/components/employee-management/employee-item";
import { Alert } from "@/components/alert";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScheduleModal } from "@/components/employee-management/schedule-modal";

import { generateScheduleDates } from "@/scheduleFunc/generateScheduleDates";
import { createSchedule } from "@/scheduleFunc/useScheduleAPI";

import axios from "axios";

interface Employee {
  id: number;
  name: string;
  username: string;
}

export function EmployeeManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const isSchedule =
    (location.state as { isSchedule?: boolean })?.isSchedule ?? false;

  useEffect(() => {
    console.log("알바생 조회 요청");
    const fetchEmployees = async () => {
      try {
        setError(null);

        const token = localStorage.getItem("accessToken"); // 필요 시 토큰 포함
        const response = await axios.get("https://altong.store/api/employees", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });

        //  응답 데이터가 배열인지 확인 후 처리
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setEmployeeList(data);
        console.log("알바생 목록 응답: ", data);
      } catch (err) {
        console.error("알바생 목록 불러오기 실패:", err);
        setError("알바생 목록을 불러오지 못했습니다.");
      }
    };

    fetchEmployees();
  }, []);

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  //삭제버튼 클릭 -> 모달 오픈
  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAlertOpen(true);
  };

  // 확인 클릭 → 삭제 API 호출
  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://altong.store/api/employees/${selectedEmployee.id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // 삭제 성공 시 목록 업데이트
        setEmployeeList((prev) =>
          prev.filter((emp) => emp.id !== selectedEmployee.id)
        );
        console.log(`알바생 ${selectedEmployee.name} 삭제 성공`);
      } else {
        console.error("삭제 실패:", response);
        setError("알바생 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("알바생 삭제 요청 실패:", err);
      setError("알바생 삭제 요청 중 오류가 발생했습니다.");
    } finally {
      setIsAlertOpen(false);
      setSelectedEmployee(null);
    }
  };
  //추가 버튼 클릭-> 등록 페이지 이동
  const handleAddEmployee = () => {
    navigate("/employee-management/add");
  };

  // 일정 등록 모드에서 직원 선택 시
  const handleSelectEmployee = (employee: Employee) => {
    if (!isSchedule) return;
    setSelectedEmployee(employee);
    setScheduleModalOpen(true);
  };

  // 일정 저장
  const handleConfirmSchedule = async (selectedDays: string[]) => {
    if (!selectedEmployee) return;
    
    const workDates = generateScheduleDates(selectedDays);

    await createSchedule({
      employeeId: selectedEmployee.id,
      workDates,
    });

    setScheduleModalOpen(false);
    navigate("/schedule");
  };

  return (
    <Container>
      {scheduleModalOpen && (
        <ScheduleModal
          name={selectedEmployee?.name}
          id={selectedEmployee?.username}
          onClose={() => setScheduleModalOpen(false)}
          onConfirm={handleConfirmSchedule}
        />
      )}
      {isAlertOpen && selectedEmployee && (
        <Alert
          title="알바생 삭제"
          description={`'${selectedEmployee.name}' 알바생을 삭제하시겠습니까?`}
          alertType="delete"
          onClose={handleAlertClose}
          onConfirm={handleConfirmDelete}
        />
      )}
      <Content>
        <SearchBar placeholder="알바생 검색" />
        {isSchedule == true ? null : (
          <ButtonContainer>
            <SmallButton text="추가하기" onClick={handleAddEmployee} />
          </ButtonContainer>
        )}

        {/* <EmployeeListContainer>
          {employeeList_test.map((employee, index) => (
            <EmployeeItem
              key={index}
              name={employee.name}
              id={employee.id}
              onDelete={handleDeleteEmployee}
            />
          ))}
           <EmployeeListNoDataText>알바생을 추가해주세요.</EmployeeListNoDataText> 
        </EmployeeListContainer> */}
        <EmployeeListContainer>
          {error ? (
            <EmployeeListNoDataText>{error}</EmployeeListNoDataText>
          ) : employeeList.length === 0 ? (
            <EmployeeListNoDataText>
              알바생을 추가해주세요.
            </EmployeeListNoDataText>
          ) : (
            employeeList.map((employee) => (
              <EmployeeItem
                key={employee.id}
                name={employee.name}
                id={employee.username}
                onDelete={() => handleDeleteEmployee(employee)}
                onSelect={() => handleSelectEmployee(employee)}
                isSchedule={isSchedule}
              />
            ))
          )}
        </EmployeeListContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 27px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
`;

const EmployeeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  height: 100%;
  margin-top: 34px;
`;

const EmployeeListNoDataText = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.texts.subtitle3.fontSize};
  color: ${theme.colors.gray3};
`;
