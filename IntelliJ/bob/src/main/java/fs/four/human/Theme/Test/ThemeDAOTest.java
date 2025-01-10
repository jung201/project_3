package fs.four.human.Theme.Test;

import fs.four.human.Theme.dao.ThemeDAO;
import fs.four.human.Theme.vo.ThemeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ThemeDAOTest {

    @Autowired
    private ThemeDAO themeDAO;

    public void testGetAllThemes() {
        // 전체 테마 불러오기 테스트
        List<ThemeVO> themes = themeDAO.getAllThemes();
        for (ThemeVO theme : themes) {
            System.out.println(theme);
        }
    }
}
