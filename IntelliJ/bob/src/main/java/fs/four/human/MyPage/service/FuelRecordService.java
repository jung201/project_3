package fs.four.human.MyPage.service;

import fs.four.human.MyPage.dao.FuelRecordDAO;
import fs.four.human.MyPage.vo.FuelRecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuelRecordService {

    @Autowired
    private FuelRecordDAO fuelRecordDAO; // DAO 객체를 주입하여 데이터베이스 작업 수행

    public int saveFuelRecord(FuelRecordVO fuelRecord) {
        if (fuelRecord.getUuId() == 0) {
            // ID가 0인 경우 새 기록 추가
            return fuelRecordDAO.insertFuelRecord(fuelRecord);
        } else {
            // ID가 0이 아닌 경우 기존 기록 수정
            return fuelRecordDAO.updateFuelRecord(fuelRecord);
        }
    }

    // 사용자 ID로 주유 기록 조회
    public List<FuelRecordVO> getFuelRecordsByUserId(String userId) {
        return fuelRecordDAO.getFuelRecordsByUserId(userId);
    }

    // 주유기록 삭제
    public int deleteFuelRecord(int id) {
        return fuelRecordDAO.deleteFuelRecord(id);
    }
}
