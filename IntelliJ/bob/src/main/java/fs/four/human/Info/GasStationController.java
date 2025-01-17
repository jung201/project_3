package fs.four.human.Info;

import fs.four.human.Info.service.GasStationService;
import fs.four.human.Info.vo.GasInfoVO;
import fs.four.human.Info.vo.GasStationVO;
import fs.four.human.Info.vo.RatingVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

public class GasStationController {

    @Autowired
    private GasStationService gasStationService;

    // 주유소 데이터를 외부 API에서 가져와 저장
    @PostMapping("/api/gas-stations/fetch")
    public ResponseEntity<String> fetchGasStations() {
        try {
            gasStationService.fetchAndSaveGasStations();
            return ResponseEntity.ok("Gas stations fetched and saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching gas stations: " + e.getMessage());
        }
    }

    // 모든 주유소 데이터를 반환
    @GetMapping("/api/gas-stations")
    public ResponseEntity<List<GasStationVO>> getGasStations() {
        return ResponseEntity.ok(gasStationService.getAllGasStations());
    }

    // 주유소 데이터를 전국 평균 유가와 비교하여 반환
    @GetMapping("/api/gas-stations-with-price")
    public ResponseEntity<List<Map<String, Object>>> getGasStationsWithPrice() {
        try {
            List<Map<String, Object>> gasStationsWithPrice = gasStationService.getGasStationsWithPriceComparison();
            return ResponseEntity.ok(gasStationsWithPrice);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // 특정 주유소의 세부 정보 조회
    @GetMapping("/api/gas-stations/{stationCode}")
    public ResponseEntity<GasInfoVO> getGasStationDetails(@PathVariable String stationCode) {
        GasInfoVO gasStation = gasStationService.getGasStationDetails(stationCode);
        if (gasStation != null) {
            return ResponseEntity.ok(gasStation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 평점 등록 API
    @PostMapping("api/gas-stations/rating")
    public String addRating(@RequestBody RatingVO rating) {
        try {
            gasStationService.saveRating(rating);
            return "평점 등록이 완료되었습니다.";
        } catch (Exception e) {
            return "평점 등록 중 오류가 발생했습니다: " + e.getMessage();
        }
    }

    // 추가: 평균 평점 가져오기
    @GetMapping("api/gas-stations/{stationCode}/average-ratings")
    public ResponseEntity<Map<String, String>> getAverageRatings(@PathVariable String stationCode) {
        try {
            Map<String, String> averageRatings = gasStationService.getAverageRatings(stationCode);
            return ResponseEntity.ok(averageRatings);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}
