package fs.four.human.Login.VO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SignupVO {
        private String uId;
        private String uPwd;
        private String uEmail;
        private String uNickname;
        private String uPhone;
        private String uCc;
        private String uPhotoName;
        private String uPhotoPath;
        private String uCreateDate;
        private String uUpdateDate;

        public SignupVO(){

        }
}
