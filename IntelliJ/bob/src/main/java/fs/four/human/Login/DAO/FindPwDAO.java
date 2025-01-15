package fs.four.human.Login.DAO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FindPwDAO {
    String findEmailById(@Param("u_id") String u_id);
    void updatePassword(@Param("u_id") String u_id, @Param("u_password") String u_password);
}
