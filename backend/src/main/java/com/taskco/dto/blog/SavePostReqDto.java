package com.taskco.dto.blog;

import com.taskco.entity.BlogPost;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SavePostReqDto {
	
	private Long id;
	
	private String title;
	
	private String page_json;
	
	private String page_html;
	
	public BlogPost toEntity(){
		return BlogPost.builder()
				.title(this.title)
				.page_json(this.page_json)
				.page_html(this.page_html)
				.build();
		
	}
	
}
