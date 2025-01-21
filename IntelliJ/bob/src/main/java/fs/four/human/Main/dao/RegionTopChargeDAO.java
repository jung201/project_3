package fs.four.human.Main.dao;

import fs.four.human.Main.vo.RegionTopChargeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RegionTopChargeDAO {
    List<RegionTopChargeVO> getTopStationsBySidocd(@Param("sidocd") String sidocd);
}
