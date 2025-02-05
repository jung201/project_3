/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : BoardService.java
 * PROGRAM NAME  : Board 관련 Service
 * DESCRIPTION   : 게시판 관련 비즈니스 로직을 처리하며, DAO를 호출하여 CRUD(생성, 조회, 수정, 삭제), 검색, 조회수 증가 기능을 제공
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * ---------------------------------------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */

package fs.four.human.Board.service;

import fs.four.human.Board.dao.BoardDAO;
import fs.four.human.Board.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardDAO boardDAO;

    // 1. 전체 게시물 조회
    public List<BoardVO> getAllBoard() {
        return boardDAO.getAllBoard();
    }

    // 2. 게시물 검색
    public List<BoardVO> searchPosts(String column, String keyword) {
        return boardDAO.searchPosts(column, keyword);
    }

    // 3. 게시글 등록
    public void createBoard(BoardVO boardVO) {
        boardDAO.createBoard(boardVO);
    }

    // 4. 게시물 삭제
    public void deletePost(int id, String currentUserId) {
        boardDAO.deletePost(id);
    }

    // 5. 게시물 삭제
    public void updatePost(BoardVO boardVO) {
        boardDAO.updatePost(boardVO);
    }

    // 6. 조회수 증가
    public void increaseViewCount(int id) {
        boardDAO.increaseViewCount(id); // MyBatis 호출
    }

    // 7. 특정 사용자 게시글 조회
    public List<BoardVO> getUserPosts(String userId) {
        return boardDAO.getUserPosts(userId);
    }
}
