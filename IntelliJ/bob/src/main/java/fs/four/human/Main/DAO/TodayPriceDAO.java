package fs.four.human.Main.DAO;


import fs.four.human.Main.VO.TodayOilAverageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodayPriceDAO {
    List<TodayOilAverageVO> getTodayOilAverages(); // 충남/전국 평균 가져오기
}
