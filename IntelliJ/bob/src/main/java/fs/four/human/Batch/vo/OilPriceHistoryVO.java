package fs.four.human.Batch.vo;

import java.time.LocalDate;

public class OilPriceHistoryVO {
    private String regionId;    // 지역 코드
    private String regionName;  // 지역 이름
    private double price;       // 유가
    private LocalDate date;     // 기준 날짜
    private LocalDate updateDate; // 업데이트 날짜

    // Getters and Setters
    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String regionId) {
        this.regionId = regionId;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }
}
