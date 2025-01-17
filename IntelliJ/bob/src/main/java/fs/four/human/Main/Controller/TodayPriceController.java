package fs.four.human.Main.Controller;

import fs.four.human.Main.Service.TodayPriceService;
import fs.four.human.Main.VO.TodayOilAverageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/today-price")
public class TodayPriceController {

    @Autowired
    private TodayPriceService todayPriceService;

    @GetMapping("/averages")
    public List<TodayOilAverageVO> getTodayOilAverages() {
        return todayPriceService.getTodayOilAverages();
    }
}
