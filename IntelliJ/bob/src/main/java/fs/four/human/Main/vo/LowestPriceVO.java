package fs.four.human.Main.VO;

import lombok.Data;

@Data
public class LowestPriceVO {
    private String lsId;
    private int lsPrice;
    private String lsName;
    private String lsAddress;
    private String lsPollDiv;
    private String lsUpdateDate;
    private String lsSidoCd;

    public String getLsId() {
        return lsId;
    }

    public void setLsId(String lsId) {
        this.lsId = lsId;
    }

    public int getLsPrice() {
        return lsPrice;
    }

    public void setLsPrice(int lsPrice) {
        this.lsPrice = lsPrice;
    }

    public String getLsName() {
        return lsName;
    }

    public void setLsName(String lsName) {
        this.lsName = lsName;
    }

    public String getLsAddress() {
        return lsAddress;
    }

    public void setLsAddress(String lsAddress) {
        this.lsAddress = lsAddress;
    }

    public String getLsPollDiv() {
        return lsPollDiv;
    }

    public void setLsPollDiv(String lsPollDiv) {
        this.lsPollDiv = lsPollDiv;
    }

    public String getLsUpdateDate() {
        return lsUpdateDate;
    }

    public void setLsUpdateDate(String lsUpdateDate) {
        this.lsUpdateDate = lsUpdateDate;
    }

    public String getLsSidoCd() {
        return lsSidoCd;
    }

    public void setLsSidoCd(String lsSidoCd) {
        this.lsSidoCd = lsSidoCd;
    }
}

