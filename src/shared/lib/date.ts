/**
 * ISO 날짜 문자열 포맷팅 함수
 * @param isoDate ex) 2025-12-29T21:22:13
 * @param withTime 시간 포함 여부
 */
export const formatDate = (isoDate: string, withTime = false): string => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  if (!withTime) {
    return `${yyyy}.${mm}.${dd}`;
  }

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};
