package fs.four.human.Theme.dao;

import fs.four.human.Theme.vo.ThemeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import  java.util.List;

@Mapper
public interface ThemeDAO {


    //1. 전체 테마 조회
    List<ThemeVO> getAllThemes();
}

