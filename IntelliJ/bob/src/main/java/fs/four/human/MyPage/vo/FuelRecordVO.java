package fs.four.human.MyPage.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class FuelRecordVO {
    private int uuId;            // 주유 기록 ID
    private String uuStation;    // 주유소 이름
    private int uuCoast;         // 금액
    private Date uuCoastDate;    // 날짜
    private String uuCreatedId;  // 작성자 ID
    private Date uuCreatedDate;  // 작성일
    private String uuUpdatedId;  // 수정자 ID
    private Date uuUpdatedDate;  // 수정일
}
