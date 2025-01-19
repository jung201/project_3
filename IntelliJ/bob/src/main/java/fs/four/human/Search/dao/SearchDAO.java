package fs.four.human.Search.dao;


import fs.four.human.Search.vo.CamVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import fs.four.human.Search.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchDAO {

    List<SearchVO> findStationsByDistance (
            double destinationLat, double destinationLng);

    int saveRouteHistory(RouteHistoryVO vo);

    List<RouteHistoryVO> findHistoryByUserId(String userId);

    //    후방
    void insertCamera(CamVO camVO);
    List<CamVO> getAllCameras();

}
