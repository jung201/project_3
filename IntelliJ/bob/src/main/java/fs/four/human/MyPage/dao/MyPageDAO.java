package fs.four.human.MyPage.dao;

import fs.four.human.MyPage.vo.FuelRecordVO;
import fs.four.human.MyPage.vo.MyPageVO;
import fs.four.human.Search.vo.RouteHistoryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyPageDAO {

    // 기존 조회
    MyPageVO getUserInfo(String uId);

    // 사용자 저보 수정
    int updateUserInfo(MyPageVO userInfo);

    // 목적지 조회
    List<RouteHistoryVO> findRouteHistoryByUserId(String userId);

    // 목적지 삭제
    int deleteRouteHistory(@Param("destinationId") int destinationId);

}
