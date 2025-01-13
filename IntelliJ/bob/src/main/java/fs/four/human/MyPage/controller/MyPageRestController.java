package fs.four.human.MyPage.controller;


import fs.four.human.MyPage.service.MyPageService;
import fs.four.human.MyPage.vo.MyPageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/myPage")
public class MyPageRestController {

    @Autowired
    private MyPageService myPageService;

    @GetMapping("/{uId}")
    public MyPageVO getUserInfo(
            @PathVariable("uId") String uId) {
        System.out.println("uId : " + uId);
        return myPageService.getUserInfo(uId);
    }
}
