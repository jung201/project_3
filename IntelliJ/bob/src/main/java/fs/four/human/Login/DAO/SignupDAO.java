package fs.four.human.Login.DAO;

import fs.four.human.Login.VO.SignupVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SignupDAO {
    // 아이디 중복 체크 메서드
    int checkIdDuplicate(@Param("uId") String uId);

    // 회원 정보 등록 메서드
    void registerUser(SignupVO signupVO);
}
