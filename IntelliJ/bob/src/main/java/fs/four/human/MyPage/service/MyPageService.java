package fs.four.human.MyPage.service;


import fs.four.human.MyPage.dao.MyPageDAO;
import fs.four.human.MyPage.vo.MyPageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {

    @Autowired
    private MyPageDAO myPageDAO;

    public MyPageVO getUserInfo(String uId) {
        return myPageDAO.getUserInfo(uId);
    }

    public boolean updateUserInfo(MyPageVO userInfo) {
        int result = myPageDAO.updateUserInfo(userInfo);
        return result > 0; // 성공 여부 반환
    }
}
