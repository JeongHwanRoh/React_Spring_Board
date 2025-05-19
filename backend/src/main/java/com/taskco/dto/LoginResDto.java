package com.taskco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor // 아무 인자가 없는 기본 생성자를 자동 생성
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자를 자동 생성
@Builder
public class LoginResDto {
	
	//jwt 토큰 리턴
	private String accessToken; // 인증할 때 사용하는 토큰
	private String refreshToken;

	

}
