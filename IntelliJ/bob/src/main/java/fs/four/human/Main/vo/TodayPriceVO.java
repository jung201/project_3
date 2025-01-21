package fs.four.human.Main.vo;

import lombok.Data;


@Data
    public class TodayPriceVO {
        // "전국" 또는 "충남"
        private String region;

        // 오늘(가장 최근 날짜)의 평균, 최저, 최고
        private Double averagePrice;
        private Double minPrice;
        private Double maxPrice;

        // 전일(이전 날짜) 평균
        private Double yesterdayPrice;

        // 상승폭 (오늘 평균 - 전일 평균)
        private Double priceChange;

    }
