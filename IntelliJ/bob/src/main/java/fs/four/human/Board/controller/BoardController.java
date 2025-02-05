/*
 * PROJECT       : Jeju_BookingEngine  ➝ 프로젝트 이름: 제주 예약 엔진 (Jeju_BookingEngine)
 * PROGRAM ID    : PaymentService.java  ➝ 프로그램 ID: PaymentService.java (파일명)
 * PROGRAM NAME  : Payment 관련 Service  ➝ 프로그램 이름: 결제 관련 서비스
 * DESCRIPTION   : (비어 있음) ➝ 설명란이 비어 있음 😢
 * AUTHOR        : 최선혁  ➝ 작성자: 최선혁
 * CREATED DATE  : 2013.05.22.  ➝ 작성 날짜: 2013년 5월 22일
 * HISTORY
 * =====================================================
 * DATE     NAME   DESCRIPTION
 * ---------------------------------------------------------------------------------
 * 2013.05.2
 */

package fs.four.human.Board.controller;

import fs.four.human.Board.service.BoardService;
import fs.four.human.Board.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardRestController {

    @Autowired
    private BoardService boardService;

    // 1. 전체 데이터 반환 ( JSON )
    @GetMapping
    public List<BoardVO> getAllBoard() {
        try {
            System.out.println("---- board ----");
            return boardService.getAllBoard();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 2. 게시글 검색
    @GetMapping("/search")
    public List<BoardVO> searchBoard(
            @RequestParam("column") String column, // 검색 기준
            @RequestParam("keyword") String keyword // 검색어
    ) {
        // 컬럼명을 안전하게 검증
        if(!List.of("bId", "bCategory", "bCc", "bTitle", "bWriter").contains(column)) {
            throw new IllegalArgumentException("잘못된 검색 기준입니다. 입력값: " + column);
        }
        // 검색어 검증
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new IllegalArgumentException("검색어를 입력해주세요.");
        }

        return boardService.searchPosts(column, keyword);
    }

    // 3. 게시글 등록
    @PostMapping("/register")
    public BoardVO createBoard(@RequestBody BoardVO boardVO) {

        try {
            System.out.println("게시글 등록 요청 데이터: " + boardVO);
            boardService.createBoard(boardVO);
            return boardVO; // 등록된 게시글 반환

        } catch (Exception e) {
            System.err.println("게시글 등록 중 오류 발생: " + e.getMessage());
            e.printStackTrace(); // 상세 로그 출력
            throw new RuntimeException("게시글 등록 중 오류가 발생했습니다.");
        }
    }

    // 4. 게시글 삭제
    @DeleteMapping("/{postId}")
    public String deletePost (
            @PathVariable("postId") int postId,
            @RequestParam("currentUserId") String currentUserId) {

        try {
            System.out.println("게시글 삭제 요청 데이터: " + postId);
            boardService.deletePost(postId, currentUserId);
            return "게시글이 성공적으로 삭제되었습니다.";

        } catch (RuntimeException e) {
            return "삭제 실패 : " + e.getMessage();
        }
    }

    // 5. 게시글 수정
    @PutMapping("/{postId}")
    public String updatePost(
            @PathVariable("postId") int postId,
            @RequestBody BoardVO boardVO) {
        try {
            System.out.println("수정 요청 ID: " + postId);
            System.out.println("수정 요청 데이터: " + boardVO);

            boardVO.setBId(postId);
            boardService.updatePost(boardVO);
            return "게시글이 성공적으로 수정되었습니다 !";

        } catch (Exception e) {
            e.printStackTrace(); // 에러 스택 출력
            System.err.println("수정 작업 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("게시글 수정 중 오류가 발생했습니다 !");
        }
    }

    // 6. 조회수 증가
    @PatchMapping("/views/{id}")
    public void increaseViewCount(@PathVariable("id") int id) {

        try {
            boardService.increaseViewCount(id);

        } catch (Exception e) {
            throw new RuntimeException("조회수 업데이트 중 오류가 발생했습니다.");
        }
    }

    // 7. 특정 사용자 게시글 조회
    @GetMapping("/user/{userId}")
    public List<BoardVO> getUserPosts(@PathVariable("userId") String userId) {
        try {
            System.out.println("사용자 게시글 조회 요청: " + userId);
            return boardService.getUserPosts(userId);
        } catch (Exception e) {
            System.err.println("사용자 게시글 조회 중 오류: " + e.getMessage());
            throw new RuntimeException("사용자 게시글 조회 중 오류가 발생했습니다.");
        }
    }

}
