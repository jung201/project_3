package fs.four.human.Login.Service;


import fs.four.human.Login.VO.UserVO;

public interface UserService {
    UserVO login(String u_ID, String u_PWD);
}