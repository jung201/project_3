package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.SignupService;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/signup")
public class SignupController {

    @Autowired
    private SignupService signupService;

    @PostMapping("/check-id")
    public boolean checkIdDuplicate(@RequestParam String uId) {
        return signupService.checkIdDuplicate(uId);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody SignupVO signupVO) {
        boolean isSuccess = signupService.registerUser(signupVO);
        return isSuccess ? "회원가입 성공" : "회원가입 실패";
    }
}