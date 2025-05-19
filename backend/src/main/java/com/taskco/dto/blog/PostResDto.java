package com.taskco.dto.blog;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class PostResDto {
	
	private Long id;
	
	private String title;
		
	private String page_html;
	
	private String page_json;
}
