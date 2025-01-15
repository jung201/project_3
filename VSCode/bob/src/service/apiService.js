import axios from "axios";

// 공통 board URL 설정
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

// 게시글 등록
export const registerBoard = async (newPost) => {
  try {
    const response = await axios.post(`${API_board_URL}/register`, newPost);
    console.log("게시글 등록 성공:", response.data); // 디버깅 로그
    return response.data; // 등록된 데이터 반환
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    throw error; // 에러 전파
  }
};

// 게시글 삭제
export const deleteBoard = async (postId, currentUserId) => {
  try {
    const response = await axios.delete(`${API_board_URL}/${postId}`, {
      params: { currentUserId },
    });
    console.log(response.data); // 디버깅용
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error("게시글 삭제 오류:", error); // 오류 처리
    throw error; // 오류 전파
  }
};

// 게시글 수정
export const updateBoard = async (postId, updatedPost) => {
  try {
    const response = await axios.put(
      `http://192.168.0.93:3006/board/${postId}`,
      updatedPost
    );
    console.log("게시글 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};

//================================================================================

// login URL 설정
const API_login_URL = "http://192.168.0.93:3006/Login";
export const fetchLogin = async (userId, password) => {
  try {
    const response = await axios.post(API_login_URL, {
      u_ID: userId,
      u_PWD: password,
    });
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("로그인 요청 중 오류:", error); // 에러 처리
    throw error; // 에러 전달
  }
};

//================================================================================

// 로그인 상태 확인 함수
export const checkLoginStatus = () => {
  const storedUserId = sessionStorage.getItem("userId");
  if (storedUserId) {
    return {
      isLoggedIn: true,
      userId: storedUserId,
    };
  }
  return {
    isLoggedIn: false,
    userId: null,
  };
};

//================================================================================

// info URL 설정
const API_info_URL = "http://192.168.0.93:3006/info";
export const fetchInfo = async () => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_info_URL}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("데이터 불러오기 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//================================================================================

// myPage URL 설정
const API_myPage_URL = "http://192.168.0.93:3006/myPage";
export const fetchMyPage = async (userId) => {
  try {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`${API_myPage_URL}/${userId}`);
    console.log(response.data); // 디버깅용 로그 출력
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

// 사용자 정보 수정
export const updateMyPage = async (userId, payload) => {
  try {
    const response = await axios.post(`${API_myPage_URL}/${userId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드
      },
      withCredentials: true, // CORS 문제 해결
    });
    console.log("사용자 정보 수정 성공:", response.data); // 디버깅 로그
    return response.data; // 수정된 데이터 반환
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error); // 에러 처리
    throw error; // 에러 전달
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
const API_theme_URL = "http://192.168.0.93:3006/riding/api";
export const fetchTheme = async () => {
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

// import axios from 'axios';

// signup URL 설정
const API_SIGNUP_URL = "http://192.168.0.93:3006//signup/api";


// 아이디 중복 체크 함수
export const checkIdDuplicate = async (uId) => {
  try {
    const response = await axios.post(`${API_SIGNUP_URL}check-id`, null, {
      params: { uId }
    });
    console.log("아이디 중복 체크 결과:", response.data); // 디버깅용 로그 출력
    return response.data; // 중복 여부 반환
  } catch (error) {
    console.error("아이디 중복 체크 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

// 회원가입 함수
export const registerUser = async (signupData) => {
  try {
    const response = await axios.post(`${API_SIGNUP_URL}register`, signupData);
    console.log("회원가입 결과:", response.data); // 디버깅용 로그 출력
    return response.data; // 회원가입 결과 반환
  } catch (error) {
    console.error("회원가입 에러:", error); // 에러 처리
    throw error; // 에러 전파
  }
};

//==============================================================================
//아이디 찾기
const API_FindId_URL = process.env.REACT_APP_API_FindPw_URL || "http://192.168.0.93:3006/api";

export const ForgotId = {
  findIdByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_FindId_URL}/findid/findIdByEmail`, {
        params: { email },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('등록된 이메일이 없습니다.');
      }
      throw new Error('아이디 찾기 요청 중 오류가 발생했습니다.');
    }
  },
};


//비밀번호 찾기

const API_FindPw_URL = process.env.REACT_APP_API_BASE_URL || "http://192.168.0.93:3006/api";

export const ForgotPassword = {
  resetPassword: async (id, email) => {
    try {
      const response = await axios.post(`${API_FindPw_URL}/findpw/resetPassword`, null, {
        params: { u_id: id, email },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response && error.response.data
          ? error.response.data
          : '비밀번호 초기화 요청 중 오류가 발생했습니다.'
      );
    }
  },
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
