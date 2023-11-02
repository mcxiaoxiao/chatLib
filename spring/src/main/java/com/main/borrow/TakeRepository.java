package com.main.borrow;

import com.main.schema.BookEntity;
import com.main.schema.TakeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TakeRepository extends JpaRepository<TakeEntity, Integer>
{

}
