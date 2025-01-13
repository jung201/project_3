package fs.four.human.Batch.vo;

import java.time.LocalDate;

public class LowestStationVO {
    private String id;          // 주유소 코드
    private String name;        // 상호명
    private String address;     // 도로명 주소
    private String pollDiv;     // 상표
    private double price;       // 가격
    private LocalDate updateDate; // 업데이트 날짜
    private String sidoCode; // 시도 코드

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPollDiv() {
        return pollDiv;
    }

    public void setPollDiv(String pollDiv) {
        this.pollDiv = pollDiv;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public String getSidoCode() {
        return sidoCode;
    }

    public void setSidoCode(String sidoCode) {
        this.sidoCode = sidoCode;
    }
}
