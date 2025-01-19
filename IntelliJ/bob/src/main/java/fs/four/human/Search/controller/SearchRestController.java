package fs.four.human.Search.controller;


import fs.four.human.Search.service.SearchService;
import fs.four.human.Search.vo.CamVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import fs.four.human.Search.vo.SearchVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchRestController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/stations")
    public List<SearchVO> getStations(@RequestParam("destinationLat") double destinationLat,
                                      @RequestParam("destinationLng") double destinationLng) {
        System.out.println("---search/stations---");
        System.out.println("destinationLat : " + destinationLat );
        System.out.println("destinationLng : " + destinationLng );
        return searchService.findStationsByDistance(destinationLat, destinationLng);
    }

    // 예시: 저장된 기록 조회
    @GetMapping("/history")
    public List<RouteHistoryVO> getHistory(HttpSession session) {
        String userId = (String) session.getAttribute("loggedUserId");
        if (userId == null) {
            return Collections.emptyList();
        }
        return searchService.findHistoryByUserId(userId);
    }

    // 목적지(경유/목적지 이름) 저장
    @PostMapping("/history")
    public String saveRouteHistory(@RequestBody RouteHistoryVO routeHistoryVO,
                                   HttpSession session) {
        String userId = (String) session.getAttribute("loggedUserId");
        if (userId == null) {
            return "로그인이 필요합니다.";
        }
        // 작성자
        routeHistoryVO.setUrCreatedId(userId);

        int result = searchService.saveRouteHistory(routeHistoryVO);
        return (result > 0) ? "OK" : "FAIL";
    }

    //후방
    @PostMapping("/save")
    public ResponseEntity<String> saveCamera(@RequestBody CamVO camVO, HttpSession session) {
        // 세션에서 로그인한 사용자 ID 가져오기
        String userId = (String) session.getAttribute("loggedUserId");
        if (userId == null) {
            return ResponseEntity.badRequest().body("로그인이 필요합니다."); // 로그인이 되어 있지 않을 경우
        }

        // createdId 설정
        camVO.setCreatedId(userId);

        System.out.println("카메라 저장 요청: " + camVO);

        // 서비스 호출
        searchService.saveCamera(camVO);

        return ResponseEntity.ok("Camera saved successfully.");
    }


    @GetMapping("/list")
    public ResponseEntity<List<CamVO>> getAllCameras() {
        System.out.println("---hhhhhh----");
        return ResponseEntity.ok(searchService.getAllCameras());
    }

}
