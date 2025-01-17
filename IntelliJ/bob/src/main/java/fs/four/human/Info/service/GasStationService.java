package fs.four.human.Info.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.human.Info.dao.GasStationDAO;
import fs.four.human.Info.vo.GasInfoVO;
import fs.four.human.Info.vo.GasStationVO;
import org.locationtech.proj4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import fs.four.human.Info.vo.RatingVO;
import java.text.DecimalFormat;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GasStationService {

    @Autowired
    private GasStationDAO gasStationDAO;

    // TM128 좌표를 WGS84 좌표계로 변환하는 메서드
    private ProjCoordinate convertToWGS84(double x, double y) {
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem tm128 = crsFactory.createFromParameters(
                "TM128",
                "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=-146.43,507.89,681.46 +units=m +no_defs"
        );
        CoordinateReferenceSystem wgs84 = crsFactory.createFromParameters(
                "WGS84", "+proj=longlat +datum=WGS84 +no_defs"
        );

        CoordinateTransformFactory transformFactory = new CoordinateTransformFactory();
        CoordinateTransform transform = transformFactory.createTransform(tm128, wgs84);

        ProjCoordinate source = new ProjCoordinate(x, y);
        ProjCoordinate target = new ProjCoordinate();
        transform.transform(source, target);

        return target;
    }

    // 주유소 데이터를 외부 API에서 가져오고 DB에 저장하는 메서드
    public void fetchAndSaveGasStations() {
        String url = "http://www.opinet.co.kr/api/aroundAll.do"; // API URL
        RestTemplate restTemplate = new RestTemplate();

        // API 요청 파라미터 설정
        Map<String, String> params = new HashMap<>();
        params.put("code", "F250114026"); // API 키
        params.put("x", "324035.0731760447");
        params.put("y", "468153.66677200346");
        params.put("radius", "5000");
        params.put("prodcd", "B027"); // 휘발유 코드
        params.put("sort", "2");
        params.put("out", "json");

        try {
            // API 호출
            String response = restTemplate.getForObject(
                    url + "?code={code}&x={x}&y={y}&radius={radius}&prodcd={prodcd}&sort={sort}&out={out}",
                    String.class,
                    params
            );

            // JSON 데이터를 Map으로 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> jsonResponse = objectMapper.readValue(response, Map.class);

            // API 응답에서 주유소 정보 추출
            Map<String, Object> resultData = (Map<String, Object>) jsonResponse.get("RESULT");
            List<Map<String, Object>> stations = (List<Map<String, Object>>) resultData.get("OIL");

            for (Map<String, Object> station : stations) {
                String stationCode = station.get("UNI_ID") != null ? station.get("UNI_ID").toString() : "UNKNOWN";
                String brand = station.get("POLL_DIV_CD").toString();
                String name = station.get("OS_NM").toString();
                double price = Double.parseDouble(station.get("PRICE").toString());
                double distance = Double.parseDouble(station.get("DISTANCE").toString());
                double tm128X = Double.parseDouble(station.get("GIS_X_COOR").toString());
                double tm128Y = Double.parseDouble(station.get("GIS_Y_COOR").toString());

                // TM128 좌표를 WGS84 좌표로 변환
                ProjCoordinate wgs84Coord = convertToWGS84(tm128X, tm128Y);

                // DB에 중복 데이터가 있는지 확인
                if (gasStationDAO.existsByStationCode(stationCode) > 0) {
                    System.out.println("Station already exists: " + stationCode);
                    continue; // 중복 데이터 건너뛰기
                }

                // VO 객체 생성 및 데이터 설정
                GasStationVO gasStation = new GasStationVO();
                gasStation.setStationCode(stationCode);
                gasStation.setBrand(brand);
                gasStation.setName(name);
                gasStation.setPrice(price);
                gasStation.setDistance(distance);
                gasStation.setXCoordinate(tm128X);
                gasStation.setYCoordinate(tm128Y);
                gasStation.setLatitude(wgs84Coord.y);
                gasStation.setLongitude(wgs84Coord.x);

                // DB에 데이터 삽입
                gasStationDAO.insertGasStation(gasStation);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch and save gas stations.");
        }
    }

    // 모든 주유소 데이터 조회
    public List<GasStationVO> getAllGasStations() {
        return gasStationDAO.selectAllGasStations();
    }

    // 주유소 데이터를 전국 평균 유가와 비교하여 반환
    public List<Map<String, Object>> getGasStationsWithPriceComparison() {
        // 전국 평균 유가 조회
        double nationalAveragePrice = gasStationDAO.getNationalAveragePrice();

        // 주유소 데이터 조회 및 평균 대비 가격 계산
        List<Map<String, Object>> gasStations = gasStationDAO.selectGasStationsWithDetails();
        for (Map<String, Object> station : gasStations) {
            double price = ((BigDecimal) station.get("PRICE")).doubleValue(); // BigDecimal -> double 변환
            station.put("PRICE_DIFF", price - nationalAveragePrice);
        }

        return gasStations;
    }

    // 특정 주유소의 세부 정보 조회
    public GasInfoVO getGasStationDetails(String stationCode) {
        return gasStationDAO.selectGasStationDetails(stationCode);
    }
    // 평점 등록
    public void saveRating(RatingVO rating) {
        gasStationDAO.insertRating(rating);
    }

    // 추가: 특정 주유소의 평균 평점 가져오기
    public Map<String, String> getAverageRatings(String stationCode) {
        System.out.println("Fetching average ratings for stationCode: " + stationCode); // 디버깅용
        Map<String, Object> rawRatings = gasStationDAO.getAverageRatings(stationCode);
        System.out.println("Raw SQL result: " + rawRatings); // 디버깅용

        DecimalFormat df = new DecimalFormat("#.0"); // 소수점 1자리 포맷팅
        Map<String, String> formattedRatings = new HashMap<>();
        formattedRatings.put("restroomAvg", rawRatings.get("RESTROOMAVG") != null
                ? df.format(((BigDecimal) rawRatings.get("RESTROOMAVG")).doubleValue())
                : "0.0");
        formattedRatings.put("accessAvg", rawRatings.get("ACCESSAVG") != null
                ? df.format(((BigDecimal) rawRatings.get("ACCESSAVG")).doubleValue())
                : "0.0");
        formattedRatings.put("priceAvg", rawRatings.get("PRICEAVG") != null
                ? df.format(((BigDecimal) rawRatings.get("PRICEAVG")).doubleValue())
                : "0.0");

        System.out.println("Formatted Ratings: " + formattedRatings); // 디버깅용
        return formattedRatings;
    }



}
