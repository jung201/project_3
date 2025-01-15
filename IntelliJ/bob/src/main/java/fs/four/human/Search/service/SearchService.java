package fs.four.human.Search.service;

import fs.four.human.Search.dao.SearchDAO;
import fs.four.human.Search.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private SearchDAO searchDAO;

    public List<SearchVO> findStationsByDistance (double destinationLat, double destinationLng ) {
        return searchDAO.findStationsByDistance(destinationLat,destinationLng);
    }


}
