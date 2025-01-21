package fs.four.human.Main.Controller;

import java.util.List;

import fs.four.human.Main.Service.LowestPriceService;
import fs.four.human.Main.VO.LowestPriceVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LowestPriceController {

    private final LowestPriceService lowestPriceService;

    public LowestPriceController(LowestPriceService lowestPriceService) {
        this.lowestPriceService = lowestPriceService;
    }

    @GetMapping("/api/lowest-price")
    public List<LowestPriceVO> getLowestPriceStations() {
        return lowestPriceService.getLowestPriceStations();
    }
}

