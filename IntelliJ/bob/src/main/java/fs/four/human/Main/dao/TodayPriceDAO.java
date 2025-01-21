package fs.four.human.Main.dao;

import fs.four.human.Main.vo.TodayPriceVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface TodayPriceDAO {
    // “전국 평균” + “충남 평균” + (전일 대비 상승폭) 조회
    List<TodayPriceVO> getTodayOilAverages();
}
