package fs.four.human.MyPage.service;

import fs.four.human.MyPage.dao.FuelRecordDAO;
import fs.four.human.MyPage.vo.FuelRecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuelRecordService {

    @Autowired
    private FuelRecordDAO fuelRecordDAO;

    public int saveFuelRecord(FuelRecordVO fuelRecord) {
        if (fuelRecord.getUuId() == 0) {
            // 새 기록 추가
            return fuelRecordDAO.insertFuelRecord(fuelRecord);
        } else {
            // 기존 기록 수정
            return fuelRecordDAO.updateFuelRecord(fuelRecord);
        }
    }

    public List<FuelRecordVO> getFuelRecordsByUserId(String userId) {
        return fuelRecordDAO.getFuelRecordsByUserId(userId);
    }
}
