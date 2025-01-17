package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.FindPwService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/findpw")
public class FindPwController {

    @Autowired
    private FindPwService findPwService;

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam String u_id, @RequestParam String email) {
        boolean success = findPwService.resetPassword(u_id, email);
        if (!success) {
            return ResponseEntity.status(400).body("아이디와 이메일이 일치하지 않습니다.");
        }
        return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
    }
}
