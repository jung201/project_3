package fs.four.human.Search.dao;


import fs.four.human.Search.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchDAO {

    List<SearchVO> findStationsByDistance (
            double destinationLat, double destinationLng);
}
