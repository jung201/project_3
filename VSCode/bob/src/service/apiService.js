import axios from "axios";

// API 기본 URL 설정
const API_BASE_URL = "http://192.168.0.93:3006/api";

// 데이터를 가져오는 함수 (GET 요청)
export const fetchPosts = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_BASE_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};


// 인텔리제이(오라클DB) 백엔드 연결 코드 아래꺼 그대로 가져다 쓰면 됨

  // //=======================================================================
  // import { fetchPosts } from "../../service/apiService"; // 공통 API 함수 불러오기

  // // 백엔드에서 데이터 불러오기
  // useEffect(() => {
  //   const loadPosts = async () => {
  //     try {
  //       const data = await fetchPosts(); // 공통 함수 사용
  //       setPosts(data); // 게시글 데이터 설정
  //     } catch (error) {
  //       console.error("게시글 불러오기 실패:", error);
  //     }
  //   };
  
  //   loadPosts(); // 데이터 불러오기 실행
  // }, []); // 컴포넌트 마운트 시 1회 실행

  // //=======================================================================