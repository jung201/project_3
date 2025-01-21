package fs.four.human.Main.service;

import fs.four.human.Main.dao.TodayPriceDAO;
import fs.four.human.Main.vo.TodayPriceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodayPriceService {

    @Autowired
    private TodayPriceDAO todayPriceDAO;

    public List<TodayPriceVO> getTodayOilAverages() {
        return todayPriceDAO.getTodayOilAverages();
    }
}
