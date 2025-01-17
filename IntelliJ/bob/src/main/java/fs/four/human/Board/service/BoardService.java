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

}
