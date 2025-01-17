package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.FindIdService;
import fs.four.human.Login.VO.FindIdVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/findid")
public class FindIdController {

    @Autowired
    private FindIdService findIdService;

    @GetMapping("/findIdByEmail")
    public ResponseEntity<?> findIdByEmail(@RequestParam String email) {
        FindIdVO findIdVO = findIdService.findIdByEmail(email);
        if (findIdVO == null) {
            return ResponseEntity.status(404).body("등록된 이메일이 없습니다.");
        }
        return ResponseEntity.ok(findIdVO);
    }
}
