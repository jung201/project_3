package fs.four.human.Batch.vo;

import java.time.LocalDate;

public class OilPriceVO {
    private String sidoCode; // 시도 코드
    private String sidoName; // 시도 이름
    private double price; // 유가
    private double diff; // 전일 대비 증감값
    private LocalDate date; // 기준 날짜
    private LocalDate updateDate; // 업데이트 날짜

    // Getters and Setters
    public String getSidoCode() {
        return sidoCode;
    }

    public void setSidoCode(String sidoCode) {
        this.sidoCode = sidoCode;
    }

    public String getSidoName() {
        return sidoName;
    }

    public void setSidoName(String sidoName) {
        this.sidoName = sidoName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiff() {
        return diff;
    }

    public void setDiff(double diff) {
        this.diff = diff;
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
