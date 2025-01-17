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
    private String u_PWD;
    private String u_EMAIL;
    private String u_PHONE;
    private String u_PHOTO_PATH;
    private Date u_CREATED_DATE;
    private Date u_UPDATE_DATE;
    public MyPageVO(){

    }
}
