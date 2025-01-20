package fs.four.human.MyPage.controller;

import fs.four.human.MyPage.service.FuelRecordService;
import fs.four.human.MyPage.vo.FuelRecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fuelRecords")
public class FuelRecordController {

    @Autowired
    private FuelRecordService fuelRecordService; // 서비스 객체를 주입하여 비즈니스 로직 처리

    // 주유 기록 저장
    @PostMapping
    public String saveFuelRecord(@RequestBody FuelRecordVO fuelRecord) {
        System.out.println("");
        System.out.println("주유기록 저장 데이터: " + fuelRecord.toString()); // 로그 출력
        System.out.println("");

        int result = fuelRecordService.saveFuelRecord(fuelRecord);
        return result > 0 ? "저장 성공" : "저장 실패";
    }

    // 특정 사용자의 주유 기록 조회
    @GetMapping("/{userId}")
    public List<FuelRecordVO> getFuelRecordsByUserId(@PathVariable String userId) {
        return fuelRecordService.getFuelRecordsByUserId(userId);
    }

    // 주유 기록 삭제
    @DeleteMapping("/{id}")
    public String deleteFuelRecord(@PathVariable("id") int id) {
        int result = fuelRecordService.deleteFuelRecord(id);
        System.out.println("월별 주유기록 삭제 : " + id);
        return result > 0 ? "삭제 성공" : "삭제 실패";
    }
}
