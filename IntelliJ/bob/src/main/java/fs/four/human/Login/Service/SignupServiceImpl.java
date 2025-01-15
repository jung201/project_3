package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.SignupDAO;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupServiceImpl implements SignupService {

    @Autowired
    private SignupDAO signupDAO;

    @Override
    public boolean checkIdDuplicate(String uId) {
        int count = signupDAO.checkIdDuplicate(uId);
        return count > 0; // 중복된 아이디가 있으면 true 반환
    }

    @Override
    public void registerUser(SignupVO signupVO) {
        signupDAO.registerUser(signupVO); // 회원 정보 등록
    }
}
