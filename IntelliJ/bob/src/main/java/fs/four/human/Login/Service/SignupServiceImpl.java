package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.SignupDAO;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupServiceImpl implements SignupService {

    @Autowired
    private SignupDAO signupDAO;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public boolean checkIdDuplicate(String uId) {
        return signupDAO.checkIdDuplicate(uId) > 0;
    }

    @Override
    public boolean registerUser(SignupVO vo) {
        // 비밀번호 암호화
        vo.setuPwd(passwordEncoder.encode(vo.getuPwd()));
        return signupDAO.insertUser(vo) > 0;
    }
}
