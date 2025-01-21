package fs.four.human.Main.DAO;

import fs.four.human.Main.VO.LowestPriceVO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface LowestPriceDAO {
    List<LowestPriceVO> getLowestPriceStations();
}

