/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : BoardService.java
 * PROGRAM NAME  : Board 관련 Service
 * DESCRIPTION   : 게시판 데이터를 저장하고 전달하는 객체로,  게시글의 ID, 제목, 내용, 작성자, 조회수 등의 정보를 관리
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * ---------------------------------------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */

package fs.four.human.Board.vo;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardVO {
    private int bId;
    private String bCategory;
    private String bCc;
    private String bTitle;
    private String bContent;
    private String bCreatedId;
    private Date bCreatedDate;
    private String bUpdatedId;
    private Date bUpdatedDate;
    private int bViews;
    private String bWriter;

    public BoardVO() {
    }
}
