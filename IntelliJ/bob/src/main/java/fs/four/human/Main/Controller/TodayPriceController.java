package fs.four.human.Main.Controller;

import fs.four.human.Main.Service.TodayPriceService;
import fs.four.human.Main.VO.TodayPriceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TodayPriceController {

    @Autowired
    private TodayPriceService todayPriceService;

    // 예: GET /api/today-price
    @GetMapping("/api/today-price")
    public List<TodayPriceVO> getTodayOilPrices() {
        return todayPriceService.getTodayOilAverages();
    }
}
