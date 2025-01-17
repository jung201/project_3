package fs.four.human.Info.vo;

public class GasStationDetailsVO {
    private String stationCode; // 주유소 코드
    private String brand;       // 상표
    private String name;        // 상호
    private String address;     // 지번 주소
    private String roadAddress; // 도로명 주소
    private String tel;         // 전화번호
    private String lpgYn;       // LPG 여부
    private String maintYn;     // 정비소 여부
    private String carWashYn;   // 세차장 여부
    private String cvsYn;       // 편의점 여부
    private Integer oilPrice;   // 유가 정보
    private String tradeDt;     // 기준 일자
    private String tradeTm;     // 기준 시간

    // Getters and Setters

    public String getStationCode() {
        return stationCode;
    }

    public void setStationCode(String stationCode) {
        this.stationCode = stationCode;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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

    public String getRoadAddress() {
        return roadAddress;
    }

    public void setRoadAddress(String roadAddress) {
        this.roadAddress = roadAddress;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getLpgYn() {
        return lpgYn;
    }

    public void setLpgYn(String lpgYn) {
        this.lpgYn = lpgYn;
    }

    public String getMaintYn() {
        return maintYn;
    }

    public void setMaintYn(String maintYn) {
        this.maintYn = maintYn;
    }

    public String getCarWashYn() {
        return carWashYn;
    }

    public void setCarWashYn(String carWashYn) {
        this.carWashYn = carWashYn;
    }

    public String getCvsYn() {
        return cvsYn;
    }

    public void setCvsYn(String cvsYn) {
        this.cvsYn = cvsYn;
    }

    public Integer getOilPrice() {
        return oilPrice;
    }

    public void setOilPrice(Integer oilPrice) {
        this.oilPrice = oilPrice;
    }

    public String getTradeDt() {
        return tradeDt;
    }

    public void setTradeDt(String tradeDt) {
        this.tradeDt = tradeDt;
    }

    public String getTradeTm() {
        return tradeTm;
    }

    public void setTradeTm(String tradeTm) {
        this.tradeTm = tradeTm;
    }

    @Override
    public String toString() {
        return "GasStationDetailsVO{" +
                "stationCode='" + stationCode + '\'' +
                ", brand='" + brand + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", roadAddress='" + roadAddress + '\'' +
                ", tel='" + tel + '\'' +
                ", lpgYn='" + lpgYn + '\'' +
                ", maintYn='" + maintYn + '\'' +
                ", carWashYn='" + carWashYn + '\'' +
                ", cvsYn='" + cvsYn + '\'' +
                ", oilPrice=" + oilPrice +
                ", tradeDt='" + tradeDt + '\'' +
                ", tradeTm='" + tradeTm + '\'' +
                '}';
    }

}


