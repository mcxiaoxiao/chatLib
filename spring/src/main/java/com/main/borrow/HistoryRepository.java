package com.main.borrow;

import com.main.schema.HistoryEntity;
import com.main.schema.TakeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<HistoryEntity, Integer>
{

}
