package com.taskco.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskco.dto.blog.PostListResDto;
import com.taskco.dto.blog.PostResDto;
import com.taskco.dto.blog.SavePostReqDto;
import com.taskco.entity.BlogPost;
import com.taskco.repository.BlogPostRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BlogService {

	private final BlogPostRepository blogPostRepository;

	// 글 저장
	public void savePost(SavePostReqDto dto) {

		BlogPost post = dto.toEntity();

		blogPostRepository.save(post);

	}

	// 글 목록 조회
	public List<PostListResDto> getPostList() {

		System.out.println("getPostList service");
		List<BlogPost> listPost = blogPostRepository.findAll(); // 테이블 정보 전체 다 가져오기
		List<PostListResDto> result = new ArrayList<>(); // 값을 담아줄 dto

		for (BlogPost post : listPost) { // 매핑 반복문
			PostListResDto dto = PostListResDto.builder().id(post.getId()).title(post.getTitle())
					.created_at(post.getCreated_at()).build();

			result.add(dto);

		}
		System.out.println(result);

		return result;
		// 일단 엔터티 통째로 가져와서 DTO에 주입해서 프론트로 보냄.
		// 나중에 시간되면 리팩토링 할 것.

	}

	// 글 본문 조회
	public PostResDto getPost(Long id) {

		BlogPost post = blogPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("글이 존재하지 않습니다"));

		PostResDto dto = PostResDto.builder().id(post.getId()).title(post.getTitle()).page_html(post.getPage_html())
				.build();

		System.out.println(dto);
		return dto;
	}

	// 글 삭제
	public void deletePost(Long id) {

		blogPostRepository.deleteById(id);

	}

	// 글 수정용 json 불러오기
	public PostResDto getPostJson(Long id) {

		BlogPost post = blogPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("글이 존재하지 않습니다"));

		PostResDto dto = PostResDto.builder().id(post.getId()).title(post.getTitle()).page_json(post.getPage_json())
				.build();

		System.out.println(dto);
		return dto;
	}

	// 글 업데이트

	public void updatePost(SavePostReqDto dto) {
		
		// 기존 엔터티 조회
		BlogPost post = blogPostRepository.findById(dto.getId())
				.orElseThrow(() -> new EntityNotFoundException("Post not found: id=" + dto.getId()));

		 // 2) 세터로 필드 업데이트
        post.setTitle(dto.getTitle());
        post.setPage_json(dto.getPage_json());
        post.setPage_html(dto.getPage_html());
        // updatedAt 은 @UpdateTimestamp가 자동 반영해 줍니다.
        
        blogPostRepository.save(post);

	}

}
