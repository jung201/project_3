package fs.four.human.Batch.service;

import fs.four.human.Batch.dao.OilPriceDAO;
import fs.four.human.Batch.vo.OilPriceVO;
import fs.four.human.Batch.vo.LowestStationVO;
import fs.four.human.Batch.vo.OilPriceHistoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.time.format.DateTimeFormatter; // import 추가


@Service
@Transactional
public class OilPriceApiService {

    @Autowired
    private OilPriceDAO oilPriceDAO;

    private final String apiKey = "F241220549";
    private final String baseUrl = "http://www.opinet.co.kr/api";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 전국 및 지역 평균 유가 저장
    public void saveNationalOilPrice() {
        try {
            System.out.println("기본 유가 데이터 삭제 시작...");
            oilPriceDAO.deleteOilPrice();
            System.out.println("기본 유가 데이터 삭제 완료.");

            String url = baseUrl + "/avgSidoPrice.do?out=json&code=" + apiKey;
            String response = restTemplate.getForObject(url, String.class);
            JsonNode rootNode = objectMapper.readTree(response).path("RESULT").path("OIL");

            for (JsonNode oilData : rootNode) {
                if (oilData.path("PRODCD").asText().equals("B027")) { // 휘발유 필터링
                    OilPriceVO oilPriceVO = new OilPriceVO();
                    oilPriceVO.setSidoCode(oilData.path("SIDOCD").asText());
                    oilPriceVO.setSidoName(oilData.path("SIDONM").asText());
                    oilPriceVO.setPrice(oilData.path("PRICE").asDouble());
                    oilPriceVO.setDiff(oilData.path("DIFF").asDouble());
                    oilPriceVO.setDate(LocalDate.now());
                    oilPriceVO.setUpdateDate(LocalDate.now());

                    oilPriceDAO.insertOilPrice(oilPriceVO);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("유가 저장 실패: " + e.getMessage());
        }
    }

    // 최저가 주유소 데이터 저장
    public void saveLowestStations() {
        try {
            // 데이터 삭제 로그 추가
            System.out.println("최저가 주유소 데이터 삭제 시작...");
            oilPriceDAO.deleteLowestStations();
            System.out.println("최저가 주유소 데이터 삭제 완료.");

            // 지역 코드 01~19 순회
            for (int i = 1; i <= 19; i++) {
                String areaCode = String.format("%02d", i); // 지역코드 01, 02, ..., 19
                String url = baseUrl + "/lowTop10.do?out=json&code=" + apiKey + "&prodcd=B027&area=" + areaCode + "&cnt=5";
                String response = restTemplate.getForObject(url, String.class);
                JsonNode rootNode = objectMapper.readTree(response).path("RESULT").path("OIL");

                // 결과 데이터 처리
                for (JsonNode stationData : rootNode) {
                    LowestStationVO lowestStationVO = new LowestStationVO();
                    lowestStationVO.setId(stationData.path("UNI_ID").asText());
                    lowestStationVO.setName(stationData.path("OS_NM").asText());
                    lowestStationVO.setAddress(stationData.path("NEW_ADR").asText());
                    lowestStationVO.setPollDiv(stationData.path("POLL_DIV_CD").asText());
                    lowestStationVO.setPrice(stationData.path("PRICE").asDouble());
                    lowestStationVO.setUpdateDate(LocalDate.now());
                    lowestStationVO.setSidoCode(areaCode); // 시도 코드 추가

                    oilPriceDAO.insertLowestStation(lowestStationVO);
                }
            }
            System.out.println("최저가 주유소 데이터 저장 완료!");
        } catch (Exception e) {
            throw new RuntimeException("최저가 주유소 저장 실패: " + e.getMessage());
        }
    }



    // 유가 이력 데이터 저장
    public void saveOilPriceHistory() {
        try {
            oilPriceDAO.deleteOilPriceHistory();
            System.out.println("기존 유가 이력 데이터 삭제 완료.");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd"); // 날짜 형식 정의

            for (int i = 0; i <= 19; i++) {
                String areaCode = String.format("%02d", i); // 지역코드 00, 01, ..., 19
                String url = baseUrl + "/areaAvgRecentPrice.do?out=json&code=" + apiKey + "&area=" + areaCode + "&prodcd=B027";
                String response = restTemplate.getForObject(url, String.class);
                JsonNode rootNode = objectMapper.readTree(response).path("RESULT").path("OIL");

                for (JsonNode historyData : rootNode) {
                    OilPriceHistoryVO oilPriceHistoryVO = new OilPriceHistoryVO();
                    oilPriceHistoryVO.setRegionId(historyData.path("AREA_CD").asText());
                    oilPriceHistoryVO.setRegionName(historyData.path("AREA_NM").asText());
                    oilPriceHistoryVO.setPrice(historyData.path("PRICE").asDouble());

                    // 날짜 변환 시 포맷터 적용
                    oilPriceHistoryVO.setDate(LocalDate.parse(historyData.path("DATE").asText(), formatter));
                    oilPriceHistoryVO.setUpdateDate(LocalDate.now());

                    oilPriceDAO.insertOilPriceHistory(oilPriceHistoryVO);
                }
            }
            System.out.println("유가 이력 데이터 저장 완료!");
        } catch (Exception e) {
            throw new RuntimeException("유가 추이 저장 실패: " + e.getMessage());
        }
    }
}