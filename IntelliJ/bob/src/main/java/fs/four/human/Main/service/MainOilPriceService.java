package fs.four.human.Main.service;

import fs.four.human.Main.dao.MainOilPriceDAO;
import fs.four.human.Main.vo.MainOilPriceVO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MainOilPriceService {

    private final MainOilPriceDAO mainOilPriceDAO;

    public MainOilPriceService(MainOilPriceDAO mainOilPriceDAO) {
        this.mainOilPriceDAO = mainOilPriceDAO;
    }

    // 모든 유가 정보를 가져오는 메서드
    public List<MainOilPriceVO> getAllOilPrices() {
        return mainOilPriceDAO.getAllOilPrices();
    }

    // 특정 지역 유가 정보를 가져오는 메서드
    public MainOilPriceVO getOilPriceByRegion(String regionId) {
        return mainOilPriceDAO.getOilPriceByRegion(regionId);
    }
}
