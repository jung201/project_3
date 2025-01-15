package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.SignupService;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup/api")
public class SignupController {

    @Autowired
    private SignupService signupService;

    // 아이디 중복 체크 (GET, POST 모두 허용)
    @RequestMapping(value = "/check-id", method = {RequestMethod.GET, RequestMethod.POST})
    public boolean checkIdDuplicate(@RequestParam String uId) {
        return signupService.checkIdDuplicate(uId);
    }

    // 회원가입 (POST 요청만 허용)
    @PostMapping("/register")
    public String registerUser(@RequestBody SignupVO signupVO) {
        try {
            signupService.registerUser(signupVO);
            return "회원가입이 완료되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "회원가입 중 오류가 발생했습니다.";
        }
    }
}
