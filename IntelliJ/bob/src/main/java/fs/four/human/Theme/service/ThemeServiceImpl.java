package fs.four.human.Theme.service;

import fs.four.human.Theme.dao.ThemeDAO;
import fs.four.human.Theme.vo.ThemeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ThemeServiceImpl  implements ThemeService{

    public ThemeServiceImpl() {
        System.out.println("ThemeServiceImpl 빈이 생성되었습니다.");
    }

    // ThemeDAO 주입
    @Autowired
    private ThemeDAO themeDAO;

    @Override
    public List<ThemeVO> getAllThemes() {
        // DAO를 호출하여 전체 테마 리스트를 가져옴
        List<ThemeVO> themes = themeDAO.getAllThemes();

        // 데이터 수 출력
        System.out.println("조회된 테마 수: " + themes.size());

        // 결과 반환
        return themes;
    }
}
