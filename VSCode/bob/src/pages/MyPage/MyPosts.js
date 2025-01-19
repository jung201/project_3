import React, { useState, useEffect } from "react";
import {
  fetchUserPosts,
  updateBoard,
  deleteBoard,
} from "../../service/apiService";
import { getCategoryLabel, getCategoryCode } from "../../utils/categoryUtils";
import "../../static/scss/MyPage/MyPosts.scss";

const MyPosts = () => {
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [editingPost, setEditingPost] = useState(null); // 수정 중인 게시글 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const userId = sessionStorage.getItem("userId"); // 로그인한 사용자 ID 가져오기

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const userPosts = await fetchUserPosts(userId); // API 호출
        setPosts(userPosts); // 상태에 데이터 저장
      } catch (error) {
        console.error("사용자 게시글 불러오기 실패:", error); // 에러 처리
      }
    };

    if (userId) {
      loadUserPosts(); // ID가 있을 때만 데이터 불러오기
    } else {
      console.warn("로그인 정보가 없습니다.");
    }
  }, [userId]);

  // 게시글 삭제
  const handleDelete = async (postId) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoard(postId, userId); // API 호출
        setPosts(posts.filter((post) => post.bid !== postId)); // 게시글 목록 업데이트
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 팝업 열기 및 수정 게시글 설정
  const handleEdit = (post) => {
    console.log("수정 버튼 클릭됨", post); // 디버깅 로그
    setEditingPost(post); // 수정할 게시글 정보 설정
    setShowPopup(true); // 팝업 열기
    console.log("showPopup 상태:", showPopup);
    console.log("editingPost 상태:", editingPost);
  };

  // 팝업 닫기
  const closePopup = () => {
    setEditingPost(null); // 수정 상태 초기화
    setShowPopup(false); // 팝업 닫기
  };

  // 수정 값 업데이트
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPost((prev) => ({ ...prev, [name]: value })); // 수정 값 업데이트
  };

  // 수정 저장
  const handleEditSave = async () => {
    try {
      const updatedPost = {
        ...editingPost,
        bcategory: getCategoryCode(editingPost.bcategory), // 카테고리 코드 변환
      };
      await updateBoard(editingPost.bid, updatedPost); // API 호출
      setPosts(
        posts.map((post) =>
          post.bid === editingPost.bid ? { ...post, ...editingPost } : post
        )
      ); // 상태 업데이트

      closePopup(); // 팝업 닫기
      alert("게시글이 수정되었습니다.");

    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    console.log("showPopup 상태 변경:", showPopup);
  }, [showPopup]);
  
  useEffect(() => {
    console.log("editingPost 상태 변경:", editingPost);
  }, [editingPost]);

  //===========================================================================

  // 페이지네이션
  const itemsPerPage = 10; // 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-posts">
      <br />
      <h3>내가 쓴 글 보기</h3>

      {/* 테이블 형식 - 웹에서만 표시 */}
      <table className="post-table">
        <thead>
          <tr>
            <th>작성일</th>
            <th>게시판 구분</th>
            <th>게시글 제목</th>
            <th>조회수</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={index}>
              <td>
                {post.bcreatedDate
                  ? new Date(post.bcreatedDate).toLocaleDateString("ko-KR")
                  : "날짜 없음"}
              </td>
              <td>{getCategoryLabel(post.bcategory) || "없음"}</td>
              <td>{post.btitle || "제목 없음"}</td>
              <td>{post.bviews || 0}</td>
              <td>
                <button onClick={() => handleDelete(post.bid)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 카드 형식 - 모바일에서만 표시 */}
      <div className="post-cards">
        {currentPosts.map((post, index) => (
          <div key={index} className="post-card">
            <div className="post-header">
              [{post.category}] {post.title}
            </div>
            <div className="post-menus">
              <div className="post-details">
                {post.date} | 조회수: {post.views}
              </div>
              <div className="post-actions">
                <button name={`edit-post-${index}`}>수정</button>
                <button name={`delete-post-${index}`}>삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          name="prevPage"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          name="nextPage"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
