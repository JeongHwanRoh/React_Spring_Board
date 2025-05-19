package com.taskco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskco.dto.LoginReqDto;
import com.taskco.dto.LoginResDto;
import com.taskco.dto.SignUpReqDto;
import com.taskco.entity.User;
import com.taskco.mapper.UserMapper;
import com.taskco.repository.UserRepository;
import com.taskco.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final UserMapper mapper;
	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginReqDto user, HttpServletResponse response) {

		// System.out.println("user"+user);
		LoginResDto resDto = authService.login(user, response);

		// System.out.println("로그인 성공");
		return ResponseEntity.ok(resDto);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUpUser(@RequestBody SignUpReqDto dto, HttpServletResponse res) {
		
		System.out.println(dto);
		LoginResDto resDto = authService.signUp(dto);
		return ResponseEntity.ok(resDto);

	}

}
