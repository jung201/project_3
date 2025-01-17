package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.FindPwDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FindPwService {

    @Autowired
    private FindPwDAO findPwDAO;

    @Autowired
    private EmailService emailService;

    public boolean resetPassword(String u_id, String email) {
        // ID로 이메일 찾기
        String registeredEmail = findPwDAO.findEmailById(u_id);
        if (registeredEmail == null || !registeredEmail.equals(email)) {
            return false; // 이메일이 없거나 일치하지 않음
        }

        // 임시 비밀번호 생성
        String tempPassword = UUID.randomUUID().toString().substring(0, 8);

        // 비밀번호 업데이트
        findPwDAO.updatePassword(u_id, tempPassword);

        // 이메일 전송
        emailService.sendEmail(email, "임시 비밀번호 발급",
                "임시 비밀번호는 다음과 같습니다: " + tempPassword + "\n로그인 후 비밀번호를 변경해주세요.");
        return true;
    }
}
