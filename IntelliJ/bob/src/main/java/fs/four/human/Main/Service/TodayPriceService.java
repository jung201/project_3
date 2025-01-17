package fs.four.human.Main.Service;

import fs.four.human.Main.DAO.TodayPriceDAO;
import fs.four.human.Main.VO.TodayOilAverageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodayPriceService {

    @Autowired
    private TodayPriceDAO todayPriceDAO;

    public List<TodayOilAverageVO> getTodayOilAverages() {
        return todayPriceDAO.getTodayOilAverages();
    }
}
