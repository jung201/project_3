package fs.four.human.Login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserVO{
    private String U_Id;          // 사용자 ID
    private String U_Pwd;         // 사용자 비밀번호
    private String U_Email;       // 사용자 이메일
    private String U_Nickname;    // 사용자 닉네임
    private String U_Cc;          // 배기량
    private String U_PhotoName;   // 프로필 사진 이름
    private String U_PhotoPath;   // 프로필 사진 경로
    private String U_CreatedDate; // 생성일
    private String U_UpdateDate;  // 업데이트일

    public String getU_Id() {
        return U_Id;
    }

    public void setU_Id(String u_Id) {
        U_Id = u_Id;
    }

    public String getU_Pwd() {
        return U_Pwd;
    }

    public void setU_Pwd(String u_Pwd) {
        U_Pwd = u_Pwd;
    }

    public String getU_Email() {
        return U_Email;
    }

    public void setU_Email(String u_Email) {
        U_Email = u_Email;
    }

    public String getU_Nickname() {
        return U_Nickname;
    }

    public void setU_Nickname(String u_Nickname) {
        U_Nickname = u_Nickname;
    }

    public String getU_Cc() {
        return U_Cc;
    }

    public void setU_Cc(String u_Cc) {
        U_Cc = u_Cc;
    }

    public String getU_PhotoName() {
        return U_PhotoName;
    }

    public void setU_PhotoName(String u_PhotoName) {
        U_PhotoName = u_PhotoName;
    }

    public String getU_PhotoPath() {
        return U_PhotoPath;
    }

    public void setU_PhotoPath(String u_PhotoPath) {
        U_PhotoPath = u_PhotoPath;
    }

    public String getU_CreatedDate() {
        return U_CreatedDate;
    }

    public void setU_CreatedDate(String u_CreatedDate) {
        U_CreatedDate = u_CreatedDate;
    }

    public String getU_UpdateDate() {
        return U_UpdateDate;
    }

    public void setU_UpdateDate(String u_UpdateDate) {
        U_UpdateDate = u_UpdateDate;
    }
}
