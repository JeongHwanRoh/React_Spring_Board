import PostDeleteButton from "@/components/common/PostDeleteButton";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:8089/api/blog/posts/${params.id}`, {
    cache: "no-store", // SSR 목적일 경우
  }); // 별도의 필드 주입이 없으면 get 사용
  //console.log("posts : ",await res.json())
  console.log();
  const post = await res.json();
  //const posts = await res.json();

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
    </div>
  );
}
