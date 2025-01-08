// 카테고리 코드 변환 (구분)
export const getCategoryLabel = (code) => {
  const categories = {
    R: "정비",
    T: "꿀팁",
    C: "코스",
    F: "자유이야기",
  };
  return categories[code];
};

export const getCategoryCode = (label) => {
  const categories = {
    정비: "R",
    꿀팁: "T",
    코스: "C",
    자유이야기: "F",
  };
  return categories[label];
};

// 배기량 코드 변환 (CC)
export const getCcLabel = (code) => {
  const ccMap = {
    S: "스쿠터",
    SM: "소형",
    M: "중형",
    L: "리터",
  };
  return ccMap[code];
};

export const getCcCode = (label) => {
  const ccMap = {
    스쿠터: "S",
    소형: "SM",
    중형: "M",
    리터: "L",
  };
  return ccMap[label];
};
