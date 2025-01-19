package fs.four.human.Search.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class CamVO {
    private Long camId;
    private Double camLatitude;
    private Double camLongitude;
    private String createdId;
    private Date createdDate;
    private String updatedId;
    private Date updatedDate;

    public CamVO() {

    }
}
