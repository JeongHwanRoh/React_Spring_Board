package com.taskco.dto.blog;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
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

	@JsonProperty("created_at")
	private LocalDateTime createdAt;
	
}
