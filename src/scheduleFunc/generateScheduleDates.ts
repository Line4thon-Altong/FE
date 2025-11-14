// 선택한 요일 → 3개월치 날짜 배열 생성
export function generateScheduleDates(selectedDays: string[]) {
  const dayMap: Record<string, number> = {
    일: 0,
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
  };

  const today = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 3);

  const result: string[] = [];

  const selectedNums = selectedDays.map((d) => dayMap[d]);

  for (let d = new Date(today); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (selectedNums.includes(day)) {
      result.push(d.toISOString().split("T")[0]);
    }
  }

  return result;
}
