package fs.four.human.Batch.dao;

import fs.four.human.Batch.vo.OilPriceVO;
import fs.four.human.Batch.vo.LowestStationVO;
import fs.four.human.Batch.vo.OilPriceHistoryVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OilPriceDAO {
    //전국 및 지역 평균 유가 데이터 삭제
    void deleteOilPrice();

    // 전국 및 지역 평균 유가 데이터 삽입
    void insertOilPrice(OilPriceVO oilPriceVO);

    // 최저가 주유소 데이터 삽입
    void insertLowestStation(LowestStationVO lowestStationVO);

    // 최저가 주유소 데이터 삭제
    void deleteLowestStations();

    // 유가 이력 데이터 삽입
    void insertOilPriceHistory(OilPriceHistoryVO oilPriceHistoryVO);

    // 유가 이력 데이터 삭제
    void deleteOilPriceHistory();
}
