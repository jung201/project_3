package fs.four.human.Login.DAO;

import fs.four.human.Login.VO.SignupVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SignupDAO {
    int checkIdDuplicate(String uId); // 아이디 중복 체크
    int insertUser(SignupVO vo); // 회원가입
}
