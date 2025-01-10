package fs.four.human.Login.DAO;

import fs.four.human.Login.VO.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository

public class UserDAO {

    @Autowired
    private SqlSession sqlSession;

    private static final String NAMESPACE = "fs.four.human.login.mapper.UserMapper";

    public UserVO login(UserVO vo) {
        return sqlSession.selectOne(NAMESPACE + ".login", vo);
    }
}