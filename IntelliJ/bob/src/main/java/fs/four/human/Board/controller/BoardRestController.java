package fs.four.human.Board.controller;


import fs.four.human.Board.service.BoardService;
import fs.four.human.Board.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소 지정
public class BoardRestController {

    @Autowired
    private BoardService boardService;

    // 전체 데이터 반환 ( JSON )
    @GetMapping
    public List<BoardVO> getAllBoard() {
        try {
            return boardService.getAllBoard();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }

    }
}
