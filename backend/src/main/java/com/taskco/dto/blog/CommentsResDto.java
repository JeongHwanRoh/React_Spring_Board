package com.taskco.dto.blog;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class CommentsResDto {

    private Long id;

    private  String author;

    private String text;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

}
