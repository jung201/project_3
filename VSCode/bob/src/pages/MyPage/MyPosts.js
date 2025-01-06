import React, { useState } from "react";
import "../../static/scss/MyPage/MyPosts.scss";

const MyPosts = () => {
  // 예제 데이터
  const allPosts = [
    { date: "2024/11/10", category: "QnA", title: "안녕하세요 여러분", views: 133 },
    { date: "2024/11/11", category: "Tips", title: "반갑습니다", views: 22 },
    { date: "2024/11/12", category: "Tips", title: "도움이 필요합니다", views: 50 },
    { date: "2024/11/13", category: "QnA", title: "새로운 질문이 있습니다", views: 77 },
    { date: "2024/11/14", category: "QnA", title: "리액트 질문입니다", views: 120 },
    { date: "2024/11/15", category: "Tips", title: "좋은 팁 공유합니다", views: 89 },
    { date: "2024/11/16", category: "QnA", title: "백엔드 관련 문의", views: 64 },
    { date: "2024/11/17", category: "Tips", title: "CSS 트릭 모음", views: 40 },
    { date: "2024/11/18", category: "QnA", title: "Redux 사용법", views: 155 },
    { date: "2024/11/19", category: "Tips", title: "좋은 도구 추천", views: 70 },
    { date: "2024/11/20", category: "QnA", title: "프로젝트에 관한 질문", views: 95 },
  ];

  const itemsPerPage = 10; // 한 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const totalPages = Math.ceil(allPosts.length / itemsPerPage);

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-posts">
      <h2>내가 쓴 글 보기</h2>
      <table>
        <thead>
          <tr style={{borderTop:"1px solid gray"}}>
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
              <td name={`post-date-${index}`}>{post.date}</td>
              <td name={`post-category-${index}`}>{post.category}</td>
              <td name={`post-title-${index}`}>{post.title}</td>
              <td name={`post-views-${index}`}>{post.views}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "solid 1px #ccc",
                  }}
                  name={`edit-post-${index}`}
                >
                  수정하기
                </button>
              </td>
              <td>
                <button
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "solid 1px #ccc",
                  }}
                  name={`delete-post-${index}`}
                >
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
