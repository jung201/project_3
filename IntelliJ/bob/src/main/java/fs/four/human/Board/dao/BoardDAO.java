package fs.four.human.Board.dao;

import fs.four.human.Board.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {

    // 전체 게시판 조회
    List<BoardVO> getAllBoard();

}