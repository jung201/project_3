package fs.four.human.Login.Controller;

import fs.four.human.Login.Service.SignupService;
import fs.four.human.Login.VO.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/signup")
public class SignupController {

    @Autowired
    private SignupService signupService;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping("/check-id/{uId}")
    public boolean checkIdDuplicate(@PathVariable String uId) {
        return signupService.checkIdDuplicate(uId);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestParam("uId") String uId,
            @RequestParam("uPwd") String uPwd,
            @RequestParam("uEmail") String uEmail,
            @RequestParam("uNickname") String uNickname,
            @RequestParam("uCc") String uCc,
            @RequestParam("uPhone") String uPhone,
            @RequestParam(value = "uPhoto", required = false) MultipartFile uPhoto) {

        try {
            // 파일 저장 처리
            String photoName = null;
            String photoPath = null;

            if (uPhoto != null && !uPhoto.isEmpty()) {
                String originalFileName = uPhoto.getOriginalFilename();
                String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
                photoName = UUID.randomUUID() + extension;
                Path filePath = Paths.get(UPLOAD_DIR, photoName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, uPhoto.getBytes());
                photoPath = filePath.toString();
            }

            // 회원가입 데이터 저장
            SignupVO vo = new SignupVO();
            vo.setuId(uId);
            vo.setuPwd(uPwd);
            vo.setuEmail(uEmail);
            vo.setuNickname(uNickname);
            vo.setuCc(uCc);
            vo.setuPhone(uPhone);
            vo.setuPhotoName(photoName);
            vo.setuPhotoPath(photoPath);

            boolean isRegistered = signupService.registerUser(vo);

            if (isRegistered) {
                return ResponseEntity.ok("회원가입 성공");
            } else {
                return ResponseEntity.badRequest().body("회원가입 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
        }
    }
}
