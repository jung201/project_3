package fs.four.human.Login.VO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserVO {
    private String U_ID;
    private String U_PWD;
    private String U_EMAIL;
    private String U_NICKNAME;
    private String U_CC;
    private String U_PHOTO_NAME;
    private String U_PHOTO_PATH;
    private String U_CREATED_DATE;
    private String U_UPDATE_DATE;

    public UserVO(){

    }

}
