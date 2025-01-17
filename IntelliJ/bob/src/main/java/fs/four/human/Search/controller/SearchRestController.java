package fs.four.human.Search.controller;


import fs.four.human.Search.service.SearchService;
import fs.four.human.Search.vo.RouteHistoryVO;
import fs.four.human.Search.vo.SearchVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
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

}
