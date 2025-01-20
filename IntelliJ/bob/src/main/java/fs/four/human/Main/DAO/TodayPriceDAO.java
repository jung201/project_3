package fs.four.human.Main.DAO;

import fs.four.human.Main.VO.TodayPriceVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface TodayPriceDAO {
    // “전국 평균” + “충남 평균” + (전일 대비 상승폭) 조회
    List<TodayPriceVO> getTodayOilAverages();
}
