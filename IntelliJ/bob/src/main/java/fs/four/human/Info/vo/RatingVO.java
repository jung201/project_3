package fs.four.human.Info.vo;

public class RatingVO {
    private String stationCode; // 주유소 아이디
    private int restroomRating; // 화장실 평점
    private int accessRating;   // 접근성 평점
    private int priceRating;    // 가격 평점

    // Getter와 Setter
    public String getStationCode() {
        return stationCode;
    }

    public void setStationCode(String stationCode) {
        this.stationCode = stationCode;
    }

    public int getRestroomRating() {
        return restroomRating;
    }

    public void setRestroomRating(int restroomRating) {
        this.restroomRating = restroomRating;
    }

    public int getAccessRating() {
        return accessRating;
    }

    public void setAccessRating(int accessRating) {
        this.accessRating = accessRating;
    }

    public int getPriceRating() {
        return priceRating;
    }

    public void setPriceRating(int priceRating) {
        this.priceRating = priceRating;
    }
}
