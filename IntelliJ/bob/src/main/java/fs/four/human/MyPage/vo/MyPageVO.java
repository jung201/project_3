package fs.four.human.MyPage.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class MyPageVO {
    private String u_ID;
    private String u_NICKNAME;
    private String u_CC;
    private Date u_CREATED_DATE;

    public MyPageVO(){

    }
}
