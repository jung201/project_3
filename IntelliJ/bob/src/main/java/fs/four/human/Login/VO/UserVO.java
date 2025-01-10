package fs.four.human.Login.VO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

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

    public String getU_ID() {
        return u_ID;
    }

    public void setU_ID(String u_ID) {
        this.u_ID = u_ID;
    }

    public String getU_PWD() {
        return u_PWD;
    }

    public void setU_PWD(String u_PWD) {
        this.u_PWD = u_PWD;
    }

    public String getU_EMAIL() {
        return u_EMAIL;
    }

    public void setU_EMAIL(String u_EMAIL) {
        this.u_EMAIL = u_EMAIL;
    }

    public String getU_NICKNAME() {
        return u_NICKNAME;
    }

    public void setU_NICKNAME(String u_NICKNAME) {
        this.u_NICKNAME = u_NICKNAME;
    }

    public String getU_CC() {
        return u_CC;
    }

    public void setU_CC(String u_CC) {
        this.u_CC = u_CC;
    }

    public String getU_PHOTO_NAME() {
        return u_PHOTO_NAME;
    }

    public void setU_PHOTO_NAME(String u_PHOTO_NAME) {
        this.u_PHOTO_NAME = u_PHOTO_NAME;
    }

    public String getU_PHOTO_PATH() {
        return u_PHOTO_PATH;
    }

    public void setU_PHOTO_PATH(String u_PHOTO_PATH) {
        this.u_PHOTO_PATH = u_PHOTO_PATH;
    }

    public String getU_CREATED_DATE() {
        return u_CREATED_DATE;
    }

    public void setU_CREATED_DATE(String u_CREATED_DATE) {
        this.u_CREATED_DATE = u_CREATED_DATE;
    }

    public String getU_UPDATE_DATE() {
        return u_UPDATE_DATE;
    }

    public void setU_UPDATE_DATE(String u_UPDATE_DATE) {
        this.u_UPDATE_DATE = u_UPDATE_DATE;
    }
}
