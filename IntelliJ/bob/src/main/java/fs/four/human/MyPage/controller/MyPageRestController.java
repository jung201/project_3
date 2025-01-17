package fs.four.human.MyPage.controller;


import fs.four.human.MyPage.service.MyPageService;
import fs.four.human.MyPage.vo.MyPageVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

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

    @PostMapping("/{uId}")
    public String updateUserInfo(
            @PathVariable("uId") String uId,
            @RequestParam("nickname") String nickname,
            @RequestParam("type") String type,
            @RequestParam("password") String password,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam(value = "bikeImage", required = false) MultipartFile bikeImage) {

        System.out.println("받은 데이터 : ");
        System.out.println("uId: " + uId);
        System.out.println("nickname: " + nickname);
        System.out.println("type: " + type);
        System.out.println("email: " + email);

        // VO 객체 생성 및 데이터 설정
        MyPageVO userInfo = new MyPageVO();
        userInfo.setU_ID(uId);
        userInfo.setU_NICKNAME(nickname);
        userInfo.setU_CC(type);
        userInfo.setU_PWD(password);
        userInfo.setU_EMAIL(email);
        userInfo.setU_PHONE(phone);

        // 파일 처리 (파일 이름 저장)
        if (bikeImage != null && !bikeImage.isEmpty()) {
            String fileName = bikeImage.getOriginalFilename();
            userInfo.setU_PHOTO_PATH(fileName);
            System.out.println("파일 이름: " + fileName);
        }

        // 서비스 호출
        boolean isSuccess = myPageService.updateUserInfo(userInfo);

        if (isSuccess) {
            return "정보가 성공적으로 수정되었습니다 !";
        } else {
            return "정보 수정에 실패했습니다. 다시 시도해주세요.";
        }
    }

    // 저장한 목적지
    @GetMapping("/{uId}/destinations")
    public List<RouteHistoryVO> getUserDestinations(@PathVariable("uId") String uId) {
        try {
            // DB에서 저장된 목적지 기록 가져오기
            List<RouteHistoryVO> routeHistory = myPageService.findRouteHistoryByUserId(uId);
            if (routeHistory == null || routeHistory.isEmpty()) {
                return Collections.emptyList(); // 빈 리스트 반환
            }
            System.out.println("가져온 목적지 데이터: " + routeHistory);
            return routeHistory;
        } catch (Exception e) {
            // 데이터 조회 중 오류 발생 시 빈 리스트 반환
            System.out.println("목적지 데이터를 가져오는 중 오류 발생: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    @DeleteMapping("/{uId}/destinations/{destinationId}")
    public String deleteDestination(
            @PathVariable("uId") String uId,
            @PathVariable("destinationId") int destinationId) {
        try {
            System.out.println("받은 uId: " + uId);
            System.out.println("받은 destinationId: " + destinationId);

            int result = myPageService.deleteRouteHistory(uId, destinationId);
            if (result > 0) {
                System.out.println("삭제 성공: destinationId = " + destinationId);
                return "삭제 성공";
            } else {
                System.out.println("삭제 실패: destinationId = " + destinationId);
                return "삭제 실패";
            }
        } catch (Exception e) {
            System.out.println("목적지 삭제 중 오류 발생: " + e.getMessage());
            return "삭제 중 오류 발생";
        }
    }
}
