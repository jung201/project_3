package fs.four.human.Login.VO;

import lombok.Getter;
import lombok.Setter;

import lombok.Data;
@Getter
@Setter
@Data
public class UserVO {
    private String u_ID;
    private String u_PWD;
    private String u_EMAIL;
    private String u_NICKNAME;
    private String u_CC;
    private String u_PHOTO_NAME;
    private String u_PHOTO_PATH;
    private String u_CREATED_DATE;
    private String u_UPDATE_DATE;

    public UserVO(){

    }
}
