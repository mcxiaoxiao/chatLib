package com.main.borrow;

import com.main.schema.HistoryEntity;
import com.main.schema.TakeEntity;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import java.security.PublicKey;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowServiceImpl implements BorrowService {
    @Resource
    private TakeRepository takeRepository;
    @Resource
    private HistoryRepository historyRepository;
    private EntityManager entityManager;
    public BorrowServiceImpl(TakeRepository takeRepository)
    {
        this.takeRepository=takeRepository;
    }

    public TakeEntity add(TakeEntity take)
    {
        return takeRepository.save(take);
    }


    public List<TakeEntity> findTakeByIdAll(int readerid)
    {
        TakeEntity take = new TakeEntity();
        Example<TakeEntity> example = Example.of(take);
        return takeRepository.findAll(example);
    }

    public TakeEntity findTakeById(int takeid)
    {
        return takeRepository.findById(takeid).orElse(null);
    }

    public List<TakeEntity> findTakeAllAll()
    {
        return takeRepository.findAll();
    }
    public Page<TakeEntity> findTakeAll(int pageNumber, int pageSize)
    {
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        return takeRepository.findAll(pageable);
    }

    public Page<HistoryEntity> findHistoryAll(int pageNumber, int pageSize)
    {
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        return historyRepository.findAll(pageable);
    }

    public List<HistoryEntity> findHistoryAllAll()
    {
        return historyRepository.findAll();
    }

    public HistoryEntity addHistory(HistoryEntity history)
    {
        return  historyRepository.save(history);
    }
}
