package fs.four.human.Login.Service;

import fs.four.human.Login.DAO.FindIdDAO;
import fs.four.human.Login.VO.FindIdVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FindIdServiceImpl implements FindIdService {

    @Autowired
    private FindIdDAO findIdDAO;

    @Override
    public FindIdVO findIdByEmail(String email) {
        return findIdDAO.findIdByEmail(email);
    }
}
