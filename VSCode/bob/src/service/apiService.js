import axios from "axios";

// board URL 설정
const API_board_URL = "http://192.168.0.93:3006/board";
export const fetchBoard = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_board_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// login URL 설정
const API_login_URL = "http://192.168.0.93:3006/login";
export const fetchLogin = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_login_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// lnfo URL 설정
const API_lnfo_URL = "http://192.168.0.93:3006/lnfo";
export const fetchlnfo = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_lnfo_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// mypage URL 설정
const API_mypage_URL = "http://192.168.0.93:3006/mypage";
export const fetchmypage = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_mypage_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// search URL 설정
const API_search_URL = "http://192.168.0.93:3006/search";
export const fetchsearche = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_search_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// theme URL 설정
const API_theme_URL = "http://192.168.0.93:3006/theme";
export const fetchtheme = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_theme_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};


//==============================================================================

  // // 백엔드에서 데이터 불러오기
  // useEffect(() => {
  //   const loadBoard = async () => {
  //     try {
  //       const data = await fetchBoard();
  //       setPosts(data); // 게시글 데이터 설정
  //     } catch (error) {
  //       console.error("게시글 불러오기 실패:", error);
  //     }
  //   };

  //   loadBoard(); // 데이터 불러오기 실행
  // }, []); // 컴포넌트 마운트 시 1회 실행