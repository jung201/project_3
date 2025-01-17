package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.UserService;
import fs.four.human.Login.VO.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Login")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 로그인 요청 처리
     * - DB에서 아이디/비밀번호 검증 후
     * - 성공하면 서버 세션에 "loggedUserId"를 저장
     */
    @PostMapping
    public UserVO login(@RequestBody UserVO user, HttpServletRequest req) {
        System.out.println("---login---");

        // 1) DB 조회
        UserVO loggedInUser = userService.login(user.getU_ID(), user.getU_PWD());
        if (loggedInUser == null) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        // 2) 세션에 userId (또는 PK, 닉네임 등 원하는 값)를 저장
        HttpSession session = req.getSession(); // 세션이 없으면 새로 생성
        session.setAttribute("loggedUserId", loggedInUser.getU_ID());

        // 필요하다면 닉네임, 권한 등도 추가로 저장 가능
        // session.setAttribute("loggedNickname", loggedInUser.getU_NICKNAME());

        System.out.println("로그인 성공: " + loggedInUser.getU_ID());

        // 3) 로그인 성공한 사용자 정보 반환
        return loggedInUser;
    }
}
