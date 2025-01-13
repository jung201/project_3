package fs.four.human.MyPage.dao;

import fs.four.human.MyPage.vo.MyPageVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageDAO {
    MyPageVO getUserInfo(String uId);
}
