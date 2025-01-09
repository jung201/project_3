package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.UserService;
import fs.four.human.Login.VO.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO userVO) {
        UserVO user = userService.login(userVO);
        if (user != null) {
            return ResponseEntity.ok(user); // 성공 시 사용자 정보 반환
        }
        return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 잘못되었습니다.");
    }
}
