package fs.four.human.Theme.controller;

import fs.four.human.Theme.service.ThemeService;
import fs.four.human.Theme.vo.ThemeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/riding")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    // 전체 테마 불러오기 API
    @GetMapping("/api")
    public List<ThemeVO> getAllThemes() {
        System.out.println("---theme---");
        return themeService.getAllThemes();
    }
    // 기본 경로 요청 처리
    @GetMapping("/view")
    public List<ThemeVO> getDefaultThemes() {
        return themeService.getAllThemes();
    }
}
