package com.main.borrow;
import com.main.schema.HistoryEntity;
import com.main.schema.TakeEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BorrowService {
    //操作1 借书
    //操作2 还书
    //操作3 查阅当前账号借阅情况
    //操作4 查看所有借阅情况（管理员）


    //增加或变更
    public TakeEntity add(TakeEntity take);
    //查询指定用户ID的所有借阅记录（分页）;
    public List<TakeEntity> findTakeByIdAll(int readerid);

    TakeEntity findTakeById(int takeid);


    public List<TakeEntity> findTakeAllAll();
    Page<TakeEntity> findTakeAll(int pageNumber, int pageSize);





    public HistoryEntity addHistory(HistoryEntity history);

    Page<HistoryEntity> findHistoryAll(int pageNumber, int pageSize);

    List<HistoryEntity> findHistoryAllAll();

}
