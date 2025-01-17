package fs.four.human.Login.Service;

import fs.four.human.Login.VO.SignupVO;

public interface SignupService {
    boolean checkIdDuplicate(String uId); // 아이디 중복 체크
    boolean registerUser(SignupVO vo); // 회원가입 처리
}