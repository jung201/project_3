import React, { useState, useEffect } from "react";
import { fetchUserPosts } from "../../service/apiService";
import { getCategoryLabel } from "../../utils/categoryUtils"; 
import "../../static/scss/MyPage/MyPosts.scss";

const MyPosts = () => {
  const [posts, setPosts] = useState([]); // 게시글 상태
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

  const itemsPerPage = 10; // 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-posts">
      <br/>
      <h3>내가 쓴 글 보기</h3>

      {/* 테이블 형식 - 웹에서만 표시 */}
      <table className="post-table">
        <thead>
          <tr>
            <th>작성일</th>
            <th>게시판 구분</th>
            <th>게시글 제목</th>
            <th>조회수</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={index}>
              <td>{post.bcreatedDate ? new Date(post.bcreatedDate).toLocaleDateString("ko-KR") : "날짜 없음"}</td>
              <td>{getCategoryLabel(post.bcategory) || "없음"}</td>
              <td>{post.btitle || "제목 없음"}</td>
              <td>{post.bviews || 0}</td>
              <td>
                <button onClick={() => alert("수정 기능은 아직 구현되지 않았습니다!")}>수정</button>
              </td>
              <td>
                <button onClick={() => alert("삭제 기능은 아직 구현되지 않았습니다!")}>삭제</button>
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
