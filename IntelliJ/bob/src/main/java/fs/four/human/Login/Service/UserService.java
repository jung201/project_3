package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.UserDAO;
import fs.four.human.Login.VO.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    public UserVO login(UserVO vo) {
        return userDAO.login(vo);
    }
}