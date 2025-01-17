package fs.four.human.Info.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.human.Info.dao.GasStationDetailsDAO;
import fs.four.human.Info.vo.GasInfoVO;
import fs.four.human.Info.vo.GasStationDetailsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GasStationDetailsService {

    @Autowired
    private GasStationDetailsDAO gasStationDetailsDAO;

    public void fetchAndSaveGasStationDetails() {
        String url = "http://www.opinet.co.kr/api/detailById.do";
        RestTemplate restTemplate = new RestTemplate();

        // 1. 테이블 초기화
        System.out.println("Clearing gas station details table...");
        gasStationDetailsDAO.clearGasStationDetailsTable();

        // 2. 주유소 ID 가져오기
        List<String> stationIds = gasStationDetailsDAO.selectAllGasStationIds();

        for (String stationId : stationIds) {
            try {
                Map<String, String> params = Map.of(
                        "code", "F250114026", // 새 앱 키 적용
                        "out", "json",
                        "id", stationId
                );

                String response = restTemplate.getForObject(
                        url + "?code={code}&out={out}&id={id}",
                        String.class,
                        params
                );

                // JSON 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> jsonResponse = objectMapper.readValue(response, Map.class);

                Map<String, Object> result = (Map<String, Object>) jsonResponse.get("RESULT");
                if (result == null) {
                    System.out.println("No RESULT found for station ID: " + stationId);
                    continue;
                }

                List<Map<String, Object>> oilData = (List<Map<String, Object>>) result.get("OIL");
                if (oilData == null || oilData.isEmpty()) {
                    System.out.println("No OIL data found for station ID: " + stationId);
                    continue;
                }

                for (Map<String, Object> oil : oilData) {
                    List<Map<String, Object>> oilPrices = (List<Map<String, Object>>) oil.get("OIL_PRICE");
                    if (oilPrices == null) {
                        System.out.println("No OIL_PRICE data found for station ID: " + stationId);
                        continue;
                    }

                    // 필터링: PRODCD가 "B027"인 데이터만 가져옴
                    Map<String, Object> petrolPriceData = oilPrices.stream()
                            .filter(price -> "B027".equals(price.get("PRODCD")))
                            .findFirst()
                            .orElse(null);

                    if (petrolPriceData == null) {
                        System.out.println("No petrol data (PRODCD: B027) for station ID: " + stationId);
                        continue;
                    }

                    // VO 객체 생성 및 데이터 설정
                    GasStationDetailsVO details = new GasStationDetailsVO();
                    details.setStationCode(safeGetString(oil, "UNI_ID"));
                    details.setBrand(safeGetString(oil, "POLL_DIV_CO"));
                    details.setName(safeGetString(oil, "OS_NM"));
                    details.setAddress(safeGetString(oil, "VAN_ADR"));
                    details.setRoadAddress(safeGetString(oil, "NEW_ADR"));
                    details.setTel(safeGetString(oil, "TEL"));
                    details.setLpgYn(safeGetString(oil, "LPG_YN"));
                    details.setMaintYn(safeGetString(oil, "MAINT_YN"));
                    details.setCarWashYn(safeGetString(oil, "CAR_WASH_YN"));
                    details.setCvsYn(safeGetString(oil, "CVS_YN"));
                    details.setOilPrice(safeGetInteger(petrolPriceData, "PRICE")); // 휘발유 가격만 설정
                    details.setTradeDt(safeGetString(petrolPriceData, "TRADE_DT"));
                    details.setTradeTm(safeGetString(petrolPriceData, "TRADE_TM"));

                    // DB 저장
                    gasStationDetailsDAO.insertGasStationDetails(details);
                }

            } catch (Exception e) {
                System.err.println("Error processing station details for ID: " + stationId);
                e.printStackTrace();
            }
        }

        System.out.println("Gas station details batch completed successfully.");
    }

    private String safeGetString(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value != null ? value.toString() : null;
    }

    private Integer safeGetInteger(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value != null ? Integer.valueOf(value.toString()) : null;
    }

}
