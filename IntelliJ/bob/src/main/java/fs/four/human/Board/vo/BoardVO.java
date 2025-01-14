package fs.four.human.Board.vo;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardVO {
    private int bId;
    private String bCategory;
    private String bCc;
    private String bTitle;
    private String bContent;
    private String bCreatedId;
    private Date bCreatedDate;
    private String bUpdatedId;
    private Date bUpdatedDate;
    private int bViews;

    public BoardVO() {
    }
}
