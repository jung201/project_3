package fs.four.human.MyPage.dao;

import fs.four.human.MyPage.vo.FuelRecordVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FuelRecordDAO {

    // 주유 기록 저장
    int insertFuelRecord(FuelRecordVO fuelRecord);

    // 주유 기록 수정
    int updateFuelRecord(FuelRecordVO fuelRecord);

    // 주유 기록 조회
    List<FuelRecordVO> getFuelRecordsByUserId(String userId);

    // 주유 기록 삭제
    int deleteFuelRecord(int id);
}
