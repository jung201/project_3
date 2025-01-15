package fs.four.human.Login.Service;

import fs.four.human.Login.VO.SignupVO;

public interface SignupService {
    // 아이디 중복 체크
    boolean checkIdDuplicate(String uId);

    // 회원가입 처리
    void registerUser(SignupVO signupVO);
}
