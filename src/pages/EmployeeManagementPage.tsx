import { SearchBar } from "@/components/employee-management/search-bar";
import styled from "styled-components";
import { SmallButton } from "@/components/small-button";
import { EmployeeItem } from "@/components/employee-management/employee-item";
import { Alert } from "@/components/alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const employeeList = [
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
          description={`'${employeeList[0].name}' 알바생을 삭제하시겠습니까?`}
          alertType="delete"
          onClose={handleAlertClose}
        />
      )}
      <Content>
        <SearchBar placeholder="알바생 검색" />
        <ButtonContainer>
          <SmallButton text="추가하기" onClick={handleAddEmployee} />
        </ButtonContainer>
        <EmployeeListContainer>
          {employeeList.map((employee, index) => (
            <EmployeeItem
              key={index}
              name={employee.name}
              id={employee.id}
              onDelete={handleDeleteEmployee}
            />
          ))}
          {/* <EmployeeListNoDataText>알바생을 추가해주세요.</EmployeeListNoDataText> */}
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
