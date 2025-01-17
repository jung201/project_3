package fs.four.human.Info.vo;

public class GasInfoVO {
    private String stationCode; // 주유소 코드
    private String brand; // 브랜드
    private String name; // 주유소 이름
    private String tel; // 전화번호
    private String address; // 주소
    private double oilPrice; // 유가
    private String updateTime; // 업데이트 날짜
    private String maintYn; // 정비소 여부
    private String cvsYn; // 편의점 여부
    private String carWashYn; // 세차장 여부

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

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getOilPrice() {
        return oilPrice;
    }

    public void setOilPrice(double oilPrice) {
        this.oilPrice = oilPrice;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getMaintYn() {
        return maintYn;
    }

    public void setMaintYn(String maintYn) {
        this.maintYn = maintYn;
    }

    public String getCvsYn() {
        return cvsYn;
    }

    public void setCvsYn(String cvsYn) {
        this.cvsYn = cvsYn;
    }

    public String getCarWashYn() {
        return carWashYn;
    }

    public void setCarWashYn(String carWashYn) {
        this.carWashYn = carWashYn;
    }
}
