/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : BoardDAO.java
 * PROGRAM NAME  : Board 관련 DAO
 * DESCRIPTION   : 게시판 관련 데이터베이스 접근을 담당하며, CRUD(생성, 조회, 수정, 삭제) 및 검색, 조회수 증가 기능 제공
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * ---------------------------------------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */

package fs.four.human.Board.dao;

import fs.four.human.Board.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    // 1. 전체 게시판 조회
    List<BoardVO> getAllBoard();

    // 2. 게시글 조회
    List<BoardVO> searchPosts(String column, String keyword);

    // 3. 게시글 등록
    void createBoard(BoardVO boardVO);

    // 4. 게시글 삭제
    void deletePost(int postId);

    // 5. 게시글 수정
    void updatePost(BoardVO boardVO);

    // 6. 조회수 증가
    void increaseViewCount(int id);

    // 7. 특정 사용자 게시글 조회
    List<BoardVO> getUserPosts(String userId);
}
