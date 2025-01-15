package fs.four.human.Search.controller;


import fs.four.human.Search.service.SearchService;
import fs.four.human.Search.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchRestController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/stations")
    public List<SearchVO> getStations(@RequestParam("destinationLat") double destinationLat,
                                      @RequestParam("destinationLng") double destinationLng) {
        System.out.println("---search/stations---");
        System.out.println("destinationLat : " + destinationLat );
        System.out.println("destinationLng : " + destinationLng );
        return searchService.findStationsByDistance(destinationLat, destinationLng);
    }

}
