package com.taskco.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taskco.dto.LoginReqDto;
import com.taskco.dto.LoginResDto;
import com.taskco.dto.SignUpReqDto;
import com.taskco.entity.User;
import com.taskco.exception.LoginFailException;
import com.taskco.mapper.UserMapper;
import com.taskco.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository userRepository;

	
	// 로그인 로직
	/* 25.04.27 엔터티와 dto 분리
	 * 서비스 단으로 주입되는 객체는 dto 객체를 주입해야함. 
	*/
	public LoginResDto login(LoginReqDto reqDto, HttpServletResponse response) {
		
		User user = userRepository.findByEmail(reqDto.getEmail())
				.orElseThrow(() -> new LoginFailException("이메일이 존재하지 않습니다"));
		
		//System.out.println("user pw : "+user.getPw());
		//System.out.println("dto pw : "+reqDto.getEmail());
		// 로그인 값과 패스워드 비교
		if(!user.getPw().equals(reqDto.getPw())){ 
			throw new LoginFailException("비밀번호가 일치하지 않습니다");
		}		
	
		LoginResDto resDto = LoginResDto.builder()
				.accessToken("access-token")
				.refreshToken("refresh-token")
				.build();
		
		return resDto; // 로그인 성공
	}
	
	
	// 회원가입 로직
	public LoginResDto signUp(SignUpReqDto reqDto){
		
		
		System.out.println(reqDto);
		//1. 이메일 중복체크
		if(userRepository.existsByEmail(reqDto.getEmail())){
	        throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}
		
		// 엔터티 변환
		System.out.println("이메일 중복체크 통과");
	    User user = reqDto.toEntity();
	    userRepository.save(user);
	    
	    LoginResDto resDto = LoginResDto.builder()
				.accessToken("access-token")
				.refreshToken("refresh-token")
				.build();
	    
		return resDto; // 로그인 성공

		
	}
	
	
	
}
