package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.UserService;
import fs.four.human.Login.VO.UserVO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Login")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserVO login(@RequestBody UserVO user) {
        UserVO loggedInUser = userService.login(user.getU_ID(), user.getU_PWD());
        System.out.println("---login---");

        if (loggedInUser == null) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return loggedInUser; // 로그인 성공한 사용자 정보 반환
    }
}
