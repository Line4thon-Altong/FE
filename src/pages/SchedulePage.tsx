import { theme } from "../styles/theme";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ScheduleModal } from "../components/scheduleModal";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";

export function SchedulePage() {
  // 날짜별 근무자 데이터 (예시)
  const shifts = {
    "2025-10-06": [{ name: "민지", color: "#ffd6d6", id: "qwewqe" }],
    "2025-10-08": [
      { name: "다연", color: "#c8e7ff", id: "qwewqe" },
      { name: "수현", color: "#d3f8d3", id: "qwewqe" },
    ],
    "2025-11-14": [{ name: "유나", color: "#ffe6b3", id: "qwewqe" }],
    "2025-11-19": [{ name: "다연", color: "#c8e7ff", id: "qwewqe" }],
    "2025-11-25": [
      { name: "지훈", color: "#ffdee2", id: "qwewqe" },
      { name: "태민", color: "#d0f0c0", id: "qwewqe" },
      { name: "지훈", color: "#ffdee2", id: "qwewqe" },
      { name: "태민", color: "#d0f0c0", id: "qwewqe" },
    ],
  };

  const [currentMonth, setCurrentMonth] = useState(new Date()); // ✅ 현재 달 동적
  const [selectedDate, setSelectedDate] = useState<string | null>(null); //클릭된 날짜 관리
  const todayStr = format(new Date(), "yyyy-MM-dd");

  // 클릭 시 모달 열기
  const handleDayClick = (dateStr: string) => {
    if (shifts[dateStr]) setSelectedDate(dateStr);
    console.log("click");
  };

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

  return (
    <Container>
      {selectedDate && (
        <ScheduleModal
          date={selectedDate}
          workers={shifts[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}
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
                <DateNumber isToday={isToday}>{format(day, "d")}</DateNumber>
                <WorkerList>
                  {workers.map((w, i) => (
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

const DateNumber = styled.div`
  font-weight: 400;
  font-size: 11px;
  color: ${(p) => (p.isToday ? "white" : "#333")};
  background: ${(p) => (p.isToday ? "#111" : "transparent")};
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
const WorkerTag = styled.div`
  background: ${(p) => p.color || "#e8e8e8"};
  color: rgba(0, 0, 0, 1);
  border-radius: 2px;
  font-size: 7px;
  font-weight: 400;
  padding: 1px 6px;
  margin: 2px auto;
  width: 100%;
`;
