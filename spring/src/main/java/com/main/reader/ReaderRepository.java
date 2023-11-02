package com.main.reader;

import com.main.schema.BookEntity;
import com.main.schema.ReaderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReaderRepository extends JpaRepository<ReaderEntity, Integer>
{

}
