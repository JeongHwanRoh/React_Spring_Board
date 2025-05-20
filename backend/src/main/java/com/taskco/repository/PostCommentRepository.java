package com.taskco.repository;

import com.taskco.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> id(Long id);

    List<PostComment> findAllByPostId(Long postId);
}
