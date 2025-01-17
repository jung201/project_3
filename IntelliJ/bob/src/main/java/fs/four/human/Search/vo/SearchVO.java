package fs.four.human.Search.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchVO {
    private String stationCode;
    private String brand;
    private String name;
    private double price;
    private double distance;
    private double latitude;
    private double longitude;

    public SearchVO(){

    }

}
