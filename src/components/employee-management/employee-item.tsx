import styled from "styled-components";
import DeleteIcon from "@/assets/icons/ic_delete";
import PersonFillIcon from "@/assets/icons/ic_person-fill";
import { theme } from "@/styles/theme";
export function EmployeeItem({
  name,
  id,
  onDelete,
}: {
  name: string;
  id: string;
  onDelete: () => void;
}) {
  return (
    <EmployeeItemWrapper>
      <EmployeeItemContent>
        <PersonFillIcon width={47} height={47} color={theme.colors.main} />
        <div>
          <EmployeeItemName>{name}</EmployeeItemName>
          <EmployeeItemId>{id}</EmployeeItemId>
        </div>
      </EmployeeItemContent>
      <ButtonWrapper onClick={onDelete}>
        <DeleteIcon width={23} height={24} />
      </ButtonWrapper>
    </EmployeeItemWrapper>
  );
}

const EmployeeItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const EmployeeItemContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

const EmployeeItemName = styled.div`
  font-size: ${theme.texts.h2.fontSize};
  font-weight: ${theme.texts.h2.fontWeight};
  line-height: ${theme.texts.h2.lineHeight};
  color: ${theme.colors.gray1};
`;

const EmployeeItemId = styled.div`
  font-size: ${theme.texts.subtitle2.fontSize};
  font-weight: ${theme.texts.subtitle2.fontWeight};
  line-height: ${theme.texts.subtitle2.lineHeight};
  color: ${theme.colors.gray3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
