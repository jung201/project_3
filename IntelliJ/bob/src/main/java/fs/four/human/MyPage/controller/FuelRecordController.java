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
    private FuelRecordService fuelRecordService;

    // 주유 기록 저장
    @PostMapping
    public String saveFuelRecord(@RequestBody FuelRecordVO fuelRecord) {
        System.out.println("");
        System.out.println("받은 데이터: " + fuelRecord.toString()); // 로그 출력
        System.out.println("");

        int result = fuelRecordService.saveFuelRecord(fuelRecord);
        return result > 0 ? "저장 성공" : "저장 실패";
    }

    // 사용자 주유 기록 조회
    @GetMapping("/{userId}")
    public List<FuelRecordVO> getFuelRecordsByUserId(@PathVariable String userId) {
        return fuelRecordService.getFuelRecordsByUserId(userId);
    }
}
