package fs.four.human.Board.dao;

import fs.four.human.Board.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    // 전체 게시판 조회
    List<BoardVO> getAllBoard();

    // 게시글 조회
    List<BoardVO> searchPosts(String column, String keyword);

    // 게시글 등록
    void createBoard(BoardVO boardVO);

    // 4. 조회수 증가
    void increaseViewCount(int id); // 조회수 증가
}
