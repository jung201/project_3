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
    void increaseViewCount(int id); // 조회수 증가
}
