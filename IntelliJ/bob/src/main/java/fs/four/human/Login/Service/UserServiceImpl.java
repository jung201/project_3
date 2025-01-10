package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.UserMapper;
import fs.four.human.Login.VO.UserVO;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserVO login(String u_ID, String u_PWD) {
        return userMapper.login(u_ID, u_PWD);
    }
}
