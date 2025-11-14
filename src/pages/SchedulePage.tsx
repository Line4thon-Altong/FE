import { theme } from "../styles/theme";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ScheduleModal } from "../components/scheduleModal";
import { SmallButton } from "@/components/small-button";
import axios from "axios";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useNavigate } from "react-router-dom";

type ShiftWorker = {
  name: string;
  color: string;
  id: string;
};

export function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workers, setWorkers] = useState<
    {
      name: string;
      id: string;
      startTime: string | null;
      endTime: string | null;
    }[]
  >([]);

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const userType = localStorage.getItem("usertype");

  const token = localStorage.getItem("accessToken");
  const storeId = localStorage.getItem("storeId");

  const [shifts, setShifts] = useState<Record<string, ShiftWorker[]>>({});
  // 색상 자동 배정용 (알바생 인원 많아도 중복 없이 돌림)
  const colorSet = [
    "#ffd6d6",
    "#c8e7ff",
    "#d3f8d3",
    "#ffe6b3",
    "#ffdee2",
    "#d0f0c0",
  ];
  let colorIndex = 0;

  const getNextColor = () => {
    const color = colorSet[colorIndex % colorSet.length];
    colorIndex++;
    return color;
  };

  //현재 year / month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth() + 1;

  // 직원별 고정 색상 저장하는 Map
  const employeeColorMap = useRef<Record<number, string>>({});

  // 서버에서 스케줄 불러오기
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!token || !storeId) return;

        let url = "";
        let params = { year, month };

        if (userType === "owner") {
          // 사장님용 API
          if (!storeId) return;
          url = `https://altong.store/api/stores/${storeId}/schedules`;
        } else {
          // 알바생용 API
          url = `https://altong.store/api/employees/me/schedules`;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        const schedules = res.data.data?.schedules || [];

        const grouped: Record<string, ShiftWorker[]> = {};

        schedules.forEach((item: any) => {
          const date = item.workDate;

          // 직원별 색상 고정
          if (!employeeColorMap.current[item.employeeId]) {
            employeeColorMap.current[item.employeeId] = getNextColor();
          }

          const fixedColor = employeeColorMap.current[item.employeeId];

          if (!grouped[date]) grouped[date] = [];

          grouped[date].push({
            name: item.employeeName,
            id: item.employeeId,
            color: fixedColor,
          });
        });

        setShifts(grouped);
      } catch (err) {
        console.error("스케줄 조회 실패", err);
      }
    };

    fetchSchedules();
  }, [year, month, token, storeId]);

  // 클릭 시 api 호출, 모달 열기
  const handleDayClick = async (dateStr: string) => {
    if (!token) return;

    if (shifts[dateStr]) setSelectedDate(dateStr);

    try {
      const dateObj = new Date(dateStr);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      let URL = "";

      if (userType === "owner") {
        URL = `https://altong.store/api/stores/${storeId}/schedules`;
      } else {
        URL = `https://altong.store/api/employees/me/schedules`;
      }

      const res = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          workDate: dateStr,
          year,
          month,
        },
      });

      const list = res.data.data?.schedules || [];

      //클릭한 날짜만 필터링
      const filtered = list.filter((item: any) => item.workDate === dateStr);

      // 모달에서 사용하기 좋게 매핑
      const formatted = filtered.map((item: any) => ({
        name: item.employeeName,
        id: String(item.employeeId),
        startTime: formatTime(item.startTime),
        endTime: formatTime(item.endTime),
      }));

      setWorkers(formatted);
    } catch (err) {
      console.error("스케쥴 조회 실패", err);
    }
  };
  //출퇴근 시간 시:분 으로 자르기
  const formatTime = (timeString: string) => {
    // "18:04:46.206880097" → ["18:04"]
    if (!timeString) return null;
    return timeString.split(".")[0].slice(0, 5);
  };

  const closeModal = () => {
    console.log("closing modal!!!!");
    setSelectedDate(null);
    setWorkers([]);
  };

  ///////////////////////달력 생성 코드///////////////////////////

  // 달 이동 함수
  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  // 현재 달의 날짜 리스트 생성
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  const firstDayOfWeek = getDay(startOfMonth(currentMonth));
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} />
  ));

  const currentMonthLabel = format(currentMonth, "MMMM");
  const currentYear = format(currentMonth, "yyyy");

  const navigate = useNavigate();
  return (
    <Container>
      {selectedDate && (
        <ScheduleModal
          date={selectedDate}
          workers={workers}
          onClose={closeModal}
        />
      )}
      {userType == "owner" ? (
        <ButtonWrapper>
          <SmallButton
            text="일정 추가하기"
            onClick={() =>
              navigate("/employee-management", { state: { isSchedule: true } })
            }
          />
        </ButtonWrapper>
      ) : null}

      <CalendarWrapper>
        <Header>
          <div>
            <h2>{currentMonthLabel}</h2>
            <span>{currentYear}</span>
          </div>
          <div>
            <ArrowButton onClick={handlePrevMonth}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ArrowButton>
            <ArrowButton onClick={handleNextMonth}>
              <FontAwesomeIcon icon={faChevronRight} />
            </ArrowButton>
          </div>
        </Header>

        <DaysRow>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </DaysRow>

        <CalendarGrid>
          {emptyCells}
          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const workers = shifts[dateStr] || [];
            const isToday = dateStr === todayStr;

            return (
              <DayCell key={dateStr} onClick={() => handleDayClick(dateStr)}>
                <DateNumber $isToday={isToday}>{format(day, "d")}</DateNumber>
                <WorkerList>
                  {workers.map((w: ShiftWorker, i: number) => (
                    <WorkerTag key={i} color={w.color}>
                      {w.name}
                    </WorkerTag>
                  ))}
                </WorkerList>
              </DayCell>
            );
          })}
        </CalendarGrid>
      </CalendarWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 31px 22px 24px 22px;
  align-items: center;
  justify-content: center;
  gap: 18px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  min-height: 578px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

// 헤더
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: rgba(37, 37, 37, 1);
  height: 67px;
  div {
    display: flex;
    align-items: center;
  }
  h2 {
    font-family: Lato;
    font-weight: 700;
    font-size: 23.75px;
    line-height: 125%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    margin-right: 12px;
  }
  span {
    font-family: Lato;
    font-weight: 300;
    font-size: 23.75px;
    line-height: 125%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: ${theme.colors.gray2};
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${theme.colors.gray2};
  font-size: ${theme.texts.subtitle3.fontSize};
  line-height: ${theme.texts.subtitle3.lineHeight};
  font-weight: ${theme.texts.subtitle3.fontWeight};
  margin-bottom: 16px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayCell = styled.div`
  height: 76.85px; /* 높이 고정 */
  padding: 1.62px;
  text-align: center;
  font-size: 13px;
  color: rgba(37, 37, 37, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateNumber = styled.div<{ $isToday?: boolean }>`
  font-weight: 400;
  font-size: 11px;
  color: ${(p) => (p.$isToday ? "white" : "#333")};
  background: ${(p) => (p.$isToday ? "#111" : "transparent")};
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 4px;
`;

const WorkerList = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;

  /* 스크롤바 완전 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 알바생 pill 태그
const WorkerTag = styled.div<{ color?: string }>`
  background: ${(p) => p.color || "#e8e8e8"};
  color: rgba(0, 0, 0, 1);
  border-radius: 2px;
  font-size: 7px;
  font-weight: 400;
  padding: 1px 6px;
  margin: 2px auto;
  width: 100%;
`;
