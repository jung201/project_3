package fs.four.human.MyPage.dao;

import fs.four.human.MyPage.vo.MyPageVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageDAO {

    // 기존 조회
    MyPageVO getUserInfo(String uId);

    // 사용자 저보 수정
    int updateUserInfo(MyPageVO userInfo);
}
