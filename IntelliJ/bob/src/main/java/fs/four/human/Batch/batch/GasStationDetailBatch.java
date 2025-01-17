package fs.four.human.Batch.batch;

import fs.four.human.Info.service.GasStationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class GasStationDetailBatch {

    @Autowired
    private GasStationDetailsService gasStationDetailsService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void fetchAndSaveGasStationDetails() {
        System.out.println("배치시작 : 주유소정보 저장중");
        try {
            gasStationDetailsService.fetchAndSaveGasStationDetails();
            System.out.println("배치완료: 주유소정보 저장완료");
        } catch (Exception e) {
            System.err.println("배치 실패: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
