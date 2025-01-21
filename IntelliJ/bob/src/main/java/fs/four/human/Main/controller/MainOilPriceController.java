package fs.four.human.Main.controller;

import fs.four.human.Main.service.MainOilPriceService;
import fs.four.human.Main.vo.MainOilPriceVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainOilPriceController {

    private final MainOilPriceService mainOilPriceService;

    public MainOilPriceController(MainOilPriceService mainOilPriceService) {
        this.mainOilPriceService = mainOilPriceService;
    }

    // 모든 유가 정보를 반환하는 API
    @GetMapping("/api/oil-prices")
    public List<MainOilPriceVO> getAllOilPrices() {
        return mainOilPriceService.getAllOilPrices();
    }

    // 특정 지역 유가 정보를 반환하는 API
    @GetMapping("/api/oil-price")
    public MainOilPriceVO getOilPriceByRegion(@RequestParam String regionId) {
        return mainOilPriceService.getOilPriceByRegion(regionId);
    }
}
