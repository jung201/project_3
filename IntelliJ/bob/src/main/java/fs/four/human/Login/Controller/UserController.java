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
    public ResponseEntity<?> login(@RequestBody UserVO vo) {
        UserVO user = userService.login(vo);
        if (user != null) {
            // 비밀번호는 응답에서 제외
            user.setU_PWD(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}
