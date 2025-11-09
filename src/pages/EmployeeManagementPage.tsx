import { SearchBar } from "@/components/employee-management/search-bar";
import styled from "styled-components";
import { SmallButton } from "@/components/small-button";
import { EmployeeItem } from "@/components/employee-management/employee-item";
import { Alert } from "@/components/alert";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const employeeList_test = [
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
  {
    name: "홍길동",
    id: "altong0000",
  },
];

export function EmployeeManagementPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState<string | null>(null); //  에러 상태 추가

  useEffect(() => {
    console.log("알바생 조회 요청");
    const fetchEmployees = async () => {
      try {
        setError(null);

        const token = localStorage.getItem("accessToken"); // 필요 시 토큰 포함
        const response = await axios.get("/api/employees", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
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

  const handleDeleteEmployee = () => {
    setIsAlertOpen(true);
  };

  const handleAddEmployee = () => {
    navigate("/employee-management/add");
  };

  return (
    <Container>
      {isAlertOpen && (
        <Alert
          title="알바생 삭제"
          description={`'${employeeList_test[0].name}' 알바생을 삭제하시겠습니까?`}
          alertType="delete"
          onClose={handleAlertClose}
        />
      )}
      <Content>
        <SearchBar placeholder="알바생 검색" />
        <ButtonContainer>
          <SmallButton text="추가하기" onClick={handleAddEmployee} />
        </ButtonContainer>
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
            employeeList.map((employee: any) => (
              <EmployeeItem
                key={employee.id}
                name={employee.name}
                id={employee.username}
                onDelete={handleDeleteEmployee}
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
  justify-content: center;
  height: 100%;
  margin-top: 34px;
`;

const EmployeeListNoDataText = styled.div`
  text-align: center;
  font-size: ${theme.texts.subtitle3.fontSize};
  color: ${theme.colors.gray3};
`;
