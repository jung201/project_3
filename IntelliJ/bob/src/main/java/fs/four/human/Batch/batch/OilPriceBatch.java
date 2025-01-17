package fs.four.human.Batch.batch;

import fs.four.human.Batch.service.OilPriceApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OilPriceBatch {

    @Autowired
    private OilPriceApiService oilPriceApiService;

    // 매일 자정에 배치 작업 실행
    @Scheduled(cron = "0 0 0 * * ?")
//    @Scheduled(cron = "0 */1 * * * ?")
    public void executeBatch() {
        System.out.println("=== 배치 작업 시작 ===");

        try {
            // 전국 및 지역 평균 유가 저장
            System.out.println("전국 및 지역 평균 유가 저장 실행...");
            oilPriceApiService.saveNationalOilPrice();
            System.out.println("전국 및 지역 평균 유가 저장 완료!");

            // 최저가 주유소 데이터 저장
            System.out.println("최저가 주유소 데이터 저장 실행...");
            oilPriceApiService.saveLowestStations();
            System.out.println("최저가 주유소 데이터 저장 완료!");

            // 유가 이력 데이터 저장
            System.out.println("유가 이력 데이터 저장 실행...");
            oilPriceApiService.saveOilPriceHistory();
            System.out.println("유가 이력 데이터 저장 완료!");

        } catch (Exception e) {
            System.err.println("배치 작업 실패: " + e.getMessage());
        }

        System.out.println("=== 배치 작업 종료 ===");
    }
}
