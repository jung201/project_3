package fs.four.human.Info.dao;

import fs.four.human.Info.vo.GasInfoVO;
import fs.four.human.Info.vo.GasStationDetailsVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GasStationDetailsDAO {
    void clearGasStationDetailsTable();  // 테이블 초기화
    List<String> selectAllGasStationIds();  // 주유소 ID 가져오기
    void insertGasStationDetails(GasStationDetailsVO details);  // 세부 정보 삽입

}