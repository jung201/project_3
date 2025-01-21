package fs.four.human.Main.dao;

import fs.four.human.Main.vo.LowestPriceVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface LowestPriceDAO {
    List<LowestPriceVO> getLowestPriceStations();
}
