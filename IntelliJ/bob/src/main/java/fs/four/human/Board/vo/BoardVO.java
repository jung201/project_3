package fs.four.human.Board.vo;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardVO {
    private int B_ID;
    private String B_CATEGORY;
    private String B_CC;
    private String B_TITLE;
    private String B_CONTENT;
    private String B_CREATED_ID;
    private Date B_CREATED_DATE;
    private String B_UPDATED_ID;
    private Date B_UPDATED_DATE;
    private int B_VIEWS;

    public BoardVO() {
    }
}
