package com.taskco.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskco.entity.User;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	// Optional로 null처리
	// 비밀번호 검증은 service 레이어에서 함. 
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);
		
}
