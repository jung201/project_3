package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.SignupDAO;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private SignupDAO signupMapper;

    public boolean checkIdDuplicate(String uId) {
        return signupMapper.checkIdDuplicate(uId) == 0; // 0이면 사용 가능
    }

    public boolean registerUser(SignupVO signupVO) {
        return signupMapper.registerUser(signupVO) > 0; // 성공 여부 반환
    }
}