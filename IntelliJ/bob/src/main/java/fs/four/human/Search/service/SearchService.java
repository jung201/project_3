package fs.four.human.Search.service;

import fs.four.human.Search.dao.SearchDAO;
import fs.four.human.Search.vo.CamVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import fs.four.human.Search.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private SearchDAO searchDAO;

    public List<SearchVO> findStationsByDistance(double lat, double lng) {
        return searchDAO.findStationsByDistance(lat, lng);
    }

    public int saveRouteHistory(RouteHistoryVO vo) {
        return searchDAO.saveRouteHistory(vo);
    }
    public List<RouteHistoryVO> findHistoryByUserId(String userId) {
        return searchDAO.findHistoryByUserId(userId);
    }

    //후방
    public void saveCamera(CamVO camVO) {
        searchDAO.insertCamera(camVO);
    }

    public List<CamVO> getAllCameras() {
        return searchDAO.getAllCameras();
    }

}
