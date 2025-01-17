package fs.four.human.Info;

import fs.four.human.Info.service.GasStationDetailsService;
import fs.four.human.Info.vo.GasInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GasStationDetailsController {

    @Autowired
    private GasStationDetailsService gasStationDetailsService;

    @GetMapping("/api/gas-stations/details/fetch")
    public ResponseEntity<String> fetchGasStationDetails() {
        try {
            gasStationDetailsService.fetchAndSaveGasStationDetails();
            return ResponseEntity.ok("Gas station details fetched and saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching gas station details: " + e.getMessage());
        }
    }

}
