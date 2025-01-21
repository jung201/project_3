package fs.four.human.Main.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class MainOilPriceVO {
    private String IOP_REGION_ID;       // 지역 ID
    private String IOP_PRICE;          // 유가
    private String IOP_DATE;           // 유가 기준 날짜
    private String IOP_UPDATE_DATE;    // 데이터 업데이트 날짜
    private String IOP_REGION_NAME;    // 지역 이름
}
