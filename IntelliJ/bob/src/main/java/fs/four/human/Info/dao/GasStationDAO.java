package fs.four.human.Info.dao;
import fs.four.human.Info.vo.RatingVO;

import fs.four.human.Info.vo.GasInfoVO;
import fs.four.human.Info.vo.GasStationVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface GasStationDAO {
    // 새로운 주유소 데이터 삽입
    void insertGasStation(GasStationVO gasStation);

    // 모든 주유소 정보 조회
    List<GasStationVO> selectAllGasStations();

    // 모든 주유소 코드(ID) 조회
    List<String> selectAllGasStationIds();

    // 특정 주유소 코드(ID) 존재 여부 확인
    int existsByStationCode(String stationCode);

    // 주유소 데이터와 세부 정보 조회
    List<Map<String, Object>> selectGasStationsWithDetails();

    // 전국 평균 유가 조회
    double getNationalAveragePrice();

    // 특정 주유소의 세부 정보 조회
    GasInfoVO selectGasStationDetails(
            @Param("stationCode") String stationCode);

    // 평점 등록 메서드
    void insertRating(RatingVO rating);

    //특정 주유소의 평균 평점 가져오기
    Map<String, Object> getAverageRatings(String stationCode);

}
