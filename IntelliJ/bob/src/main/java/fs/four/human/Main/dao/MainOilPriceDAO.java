package fs.four.human.Main.dao;

import fs.four.human.Main.vo.MainOilPriceVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface MainOilPriceDAO {
    List<MainOilPriceVO> getAllOilPrices();          // 모든 유가 정보 조회
    MainOilPriceVO getOilPriceByRegion(String regionId); // 특정 지역 유가 정보 조회
}
