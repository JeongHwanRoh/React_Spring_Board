import CommentSection from "@/components/blog/comment/CommentSection";
import PostComment from "@/components/blog/comment/PostComment";
import PostCommentEditor from "@/components/blog/comment/PostCommentEditor";
import PostDeleteButton from "@/components/common/PostDeleteButton";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const postRes = await fetch(`http://localhost:8089/api/blog/posts/${params.id}`, { // 해당하는 포스트 불러오기
    cache: "no-store", // SSR 목적일 경우
  }); // 별도의 필드 주입이 없으면 get 사용
  const post = await postRes.json();

  const commentRes = await fetch(`http://localhost:8089/api/blog/comments/${params.id}`,{
    cache: "no-store",
  });

  console.log(typeof(commentRes))
  let comments = [];
  if (commentRes.ok) {
    comments = await commentRes.json();
  } else {
    const errorText = await commentRes.text();
    console.error("Comment fetch error:", errorText);
    // 필요시 빈 배열 유지 or 오류 메시지 표시
  }

  return (
    <div className="flex flex-col">
      <h1>{post.title}</h1>
      <hr />
      <div
        className="mt-5 p-4 border-2 border-gray-200 min-h-96"
        dangerouslySetInnerHTML={{ __html: post.page_html }}
      />
      <div className="flex justify-end mt-2">
        <Link href={`/blog/${post.id}/edit`}> 수정하기 </Link>
        <PostDeleteButton postId={post.id} />
      </div>
      <CommentSection postId={post.id} intitialComments={comments}/>
      
    </div>
  );
}
