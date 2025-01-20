package fs.four.human.MyPage.service;


import fs.four.human.MyPage.dao.MyPageDAO;
import fs.four.human.MyPage.vo.FuelRecordVO;
import fs.four.human.MyPage.vo.MyPageVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // 목적지 조회
    public List<RouteHistoryVO> findRouteHistoryByUserId(String userId) {
        return myPageDAO.findRouteHistoryByUserId(userId);
    }

    // 목적지 삭제
    public int deleteRouteHistory(int destinationId) {
        return myPageDAO.deleteRouteHistory(destinationId);
    }

}
