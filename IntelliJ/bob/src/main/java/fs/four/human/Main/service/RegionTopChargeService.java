package fs.four.human.Main.service;

import fs.four.human.Main.dao.RegionTopChargeDAO;
import fs.four.human.Main.vo.RegionTopChargeVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionTopChargeService {
    private final RegionTopChargeDAO regionTopChargeDAO;

    public RegionTopChargeService(RegionTopChargeDAO regionTopChargeDAO) {
        this.regionTopChargeDAO = regionTopChargeDAO;
    }

    public List<RegionTopChargeVO> getTopStationsBySidocd(String sidocd) {
        return regionTopChargeDAO.getTopStationsBySidocd(sidocd);
    }
}
