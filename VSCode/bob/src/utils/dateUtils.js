// 상대적인 시간 표시 함수
export const formatRelativeDate = (dateString) => {
  const now = new Date(); // 현재 시간
  const postDate = new Date(dateString); // 전달받은 시간
  const diff = Math.floor((now - postDate) / 1000); // 초 단위 차이 계산

  if (diff < 60) return `${diff}초 전`; // 1분 미만
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`; // 1시간 미만
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`; // 하루 미만
  return `${Math.floor(diff / 86400)}일 전`; // 하루 이상
};

// 날짜 포맷 변경 함수 (YYYY-MM-DD 형식)
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 두 자리로 표시
  const day = String(date.getDate()).padStart(2, "0"); // 두 자리로 표시
  return `${year}-${month}-${day}`;
};
