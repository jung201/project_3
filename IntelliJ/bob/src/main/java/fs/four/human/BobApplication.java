package fs.four.human;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("fs.four.human") // 최상위 패키지를 스캔
@EnableScheduling
public class BobApplication {
	public static void main(String[] args) {
		SpringApplication.run(BobApplication.class, args);
	}
}
