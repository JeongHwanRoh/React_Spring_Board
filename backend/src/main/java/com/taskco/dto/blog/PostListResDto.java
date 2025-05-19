package com.taskco.dto.blog;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class PostListResDto {
	
	private Long id;
	
	private String title;
	
	private LocalDateTime created_at;
	
}
