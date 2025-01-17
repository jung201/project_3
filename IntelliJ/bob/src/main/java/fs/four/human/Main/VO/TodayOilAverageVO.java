package fs.four.human.Main.VO;

public class TodayOilAverageVO {
    private String region; // '전국 평균' 또는 '충남 평균'
    private Double averagePrice; // 평균 가격
    private Double minPrice;     // 최저가
    private Double maxPrice;     // 최고가

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }
}
