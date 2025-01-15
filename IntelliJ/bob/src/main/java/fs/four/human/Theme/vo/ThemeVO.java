package fs.four.human.Theme.vo;

import jakarta.websocket.server.ServerEndpoint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThemeVO {
    private int TR_PLACE_ID;
    private String TR_PLACE_NAME;
    private String TR_NUMPRODUCE1;
    private String TR_NUMPRODUCE2;
    private String CATEGORY;
    private String IMAGE;
    private int LATITUDE;
    private int LONGITUDE;

    public ThemeVO() {
    }

}
