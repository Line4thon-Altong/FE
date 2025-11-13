// scheduleFunc/scheduleAPI.ts
import axios from "axios";

export async function createSchedule({
  storeId,
  employeeId,
  workDates,
}: {
  storeId: number | string;
  employeeId: number | string;
  workDates: string[];
}) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("토큰이 없습니다. 로그인 상태를 확인하세요.");
  }

  const url = `https://altong.store/api/stores/${storeId}/employees/${employeeId}/schedules`;

  const response = await axios.post(
    url,
    { workDates },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
