package fs.four.human.Theme.service;

import fs.four.human.Theme.dao.ThemeDAO;
import fs.four.human.Theme.vo.ThemeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ThemeServiceImpl implements ThemeService {

    @Autowired
    private ThemeDAO themeDAO; // DAO 주입

    @Override
    public List<ThemeVO> getAllThemes() {
        // DAO 호출 로그 추가
        System.out.println("ThemeDAO getAllThemes() 호출");

        List<ThemeVO> themes = themeDAO.getAllThemes(); // DAO 메서드 호출

        // 데이터 수 출력
        System.out.println("조회된 테마 수: " + themes.size());

        return themes;
    }
}
