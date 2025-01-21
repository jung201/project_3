package fs.four.human.Main.service;

import fs.four.human.Main.dao.LowestPriceDAO;
import fs.four.human.Main.vo.LowestPriceVO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LowestPriceService {

    private final LowestPriceDAO lowestPriceDAO;

    public LowestPriceService(LowestPriceDAO lowestPriceDAO) {
        this.lowestPriceDAO = lowestPriceDAO;
    }

    public List<LowestPriceVO> getLowestPriceStations() {
        return lowestPriceDAO.getLowestPriceStations();
    }
}
