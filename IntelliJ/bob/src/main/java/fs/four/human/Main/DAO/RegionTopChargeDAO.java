package fs.four.human.Main.DAO;

import fs.four.human.Main.VO.RegionTopChargeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RegionTopChargeDAO {
    List<RegionTopChargeVO> getTopStationsBySidocd(@Param("sidocd") String sidocd);
}
