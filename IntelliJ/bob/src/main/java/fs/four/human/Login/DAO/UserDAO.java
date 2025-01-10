package fs.four.human.Login.DAO;


import fs.four.human.Login.VO.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDAO {
    // 로그인 처리 메서드
    UserVO login(String u_ID, String u_PWD);
}
