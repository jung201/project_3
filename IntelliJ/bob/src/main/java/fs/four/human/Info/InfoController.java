package fs.four.human.Info;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class InfoController {

    // application.properties에서 API 키를 주입
    @Value("${opinet.api.key}")
    private String apiKey;

    @GetMapping("/api/nearby-stations")
    public Object getNearbyStations(@RequestParam double x, @RequestParam double y) {
        String url = String.format(
                "http://www.opinet.co.kr/api/aroundAll.do?code=%s&x=%f&y=%f&radius=5000&sort=1&prodcd=B027&out=json",
                apiKey, x, y
        );

        RestTemplate restTemplate = new RestTemplate();
        try {
            // 오피넷 API 호출
            Object response = restTemplate.getForObject(url, Object.class);
            return response;
        } catch (Exception e) {
            e.printStackTrace();

            // 오류 발생 시 반환할 메시지
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Unable to fetch data from Opinet API");
            return errorResponse;
        }
    }
}
