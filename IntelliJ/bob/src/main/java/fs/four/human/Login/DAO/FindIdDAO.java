package fs.four.human.Login.DAO;

import fs.four.human.Login.VO.FindIdVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FindIdDAO {
    FindIdVO findIdByEmail(String email);
}
