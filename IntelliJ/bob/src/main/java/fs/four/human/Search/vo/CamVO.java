package fs.four.human.Search.vo;

import java.sql.Date;

public class CamVO {
    private Long camId;
    private Double camLatitude;
    private Double camLongitude;
    private String createdId;
    private Date createdDate;
    private String updatedId;
    private Date updatedDate;

    // Getter, Setter

    public Long getCamId() {
        return camId;
    }

    public void setCamId(Long camId) {
        this.camId = camId;
    }

    public Double getCamLatitude() {
        return camLatitude;
    }

    public void setCamLatitude(Double camLatitude) {
        this.camLatitude = camLatitude;
    }

    public Double getCamLongitude() {
        return camLongitude;
    }

    public void setCamLongitude(Double camLongitude) {
        this.camLongitude = camLongitude;
    }

    public String getCreatedId() {
        return createdId;
    }

    public void setCreatedId(String createdId) {
        this.createdId = createdId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUpdatedId() {
        return updatedId;
    }

    public void setUpdatedId(String updatedId) {
        this.updatedId = updatedId;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
}
