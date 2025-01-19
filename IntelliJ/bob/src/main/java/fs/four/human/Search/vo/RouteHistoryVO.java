package fs.four.human.Search.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class RouteHistoryVO {
    // 경유지, 목적지를 이제 문자열로
    private Integer destinationId;
    private String urStopoverName;
    private String urDestName;
    private Double urDistance;
    private String urCreatedId;
    private Date urCreatedDate;

    public RouteHistoryVO(){

    }

}
