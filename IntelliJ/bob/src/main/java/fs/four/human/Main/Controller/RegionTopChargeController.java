package fs.four.human.Main.Controller;

import fs.four.human.Main.Service.RegionTopChargeService;
import fs.four.human.Main.VO.RegionTopChargeVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RegionTopChargeController {
    private final RegionTopChargeService regionTopChargeService;

    public RegionTopChargeController(RegionTopChargeService regionTopChargeService) {
        this.regionTopChargeService = regionTopChargeService;
    }

    @GetMapping("/api/region/top-stations")
    public List<RegionTopChargeVO> getTopStations(@RequestParam("sidocd") String sidocd) {
        return regionTopChargeService.getTopStationsBySidocd(sidocd);
    }
}
