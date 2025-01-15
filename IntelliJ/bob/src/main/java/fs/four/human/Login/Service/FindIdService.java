package fs.four.human.Login.Service;


import fs.four.human.Login.VO.FindIdVO;

public interface FindIdService {
    FindIdVO findIdByEmail(String email);
}