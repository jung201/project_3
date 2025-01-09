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

    public String getU_ID() {
        return U_ID;
    }

    public void setU_ID(String u_ID) {
        U_ID = u_ID;
    }

    public String getU_PWD() {
        return U_PWD;
    }

    public void setU_PWD(String u_PWD) {
        U_PWD = u_PWD;
    }

    public String getU_EMAIL() {
        return U_EMAIL;
    }

    public void setU_EMAIL(String u_EMAIL) {
        U_EMAIL = u_EMAIL;
    }

    public String getU_NICKNAME() {
        return U_NICKNAME;
    }

    public void setU_NICKNAME(String u_NICKNAME) {
        U_NICKNAME = u_NICKNAME;
    }

    public String getU_CC() {
        return U_CC;
    }

    public void setU_CC(String u_CC) {
        U_CC = u_CC;
    }

    public String getU_PHOTO_NAME() {
        return U_PHOTO_NAME;
    }

    public void setU_PHOTO_NAME(String u_PHOTO_NAME) {
        U_PHOTO_NAME = u_PHOTO_NAME;
    }

    public String getU_PHOTO_PATH() {
        return U_PHOTO_PATH;
    }

    public void setU_PHOTO_PATH(String u_PHOTO_PATH) {
        U_PHOTO_PATH = u_PHOTO_PATH;
    }

    public String getU_CREATED_DATE() {
        return U_CREATED_DATE;
    }

    public void setU_CREATED_DATE(String u_CREATED_DATE) {
        U_CREATED_DATE = u_CREATED_DATE;
    }

    public String getU_UPDATE_DATE() {
        return U_UPDATE_DATE;
    }

    public void setU_UPDATE_DATE(String u_UPDATE_DATE) {
        U_UPDATE_DATE = u_UPDATE_DATE;
    }
}
