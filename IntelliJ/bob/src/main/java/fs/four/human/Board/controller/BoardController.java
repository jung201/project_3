package fs.four.human.Board.controller;

import fs.four.human.Board.service.BoardService;
import fs.four.human.Board.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping
    public String board(Model model) {
            List<BoardVO> boardList = boardService.getAllBoard();
            model.addAttribute("boardList", boardList);
            System.out.println("--- Board ---");
            return "board/board";
    }
}
