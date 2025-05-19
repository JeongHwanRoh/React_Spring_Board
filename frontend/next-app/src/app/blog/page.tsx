import Link from "next/link";

export default async function BlogList() {

  const res = await fetch("http://localhost:8089/api/blog/posts",{
    cache: 'no-store', // SSR 목적일 경우
  }); // 별도의 필드 주입이 없으면 get 사용
  //console.log("posts : ",await res.json())
  console.log(typeof(res))
  
  const posts = await res.json();


  return (
    <div>
      <div className="flex flex-1 h-full min-h-0 justify-between">
        <div>
          <h1>블로그</h1>
          <a> 기술 관련 포스팅을 작성합니다.</a>
        </div>
        <Link href="/blog/editor" className="">
          글쓰기
        </Link>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        {posts.map((post)=>{

          return( 
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>
            <div className="flex justify-between">
              <span>{post.title}</span>  
              <span>{post. created_at}</span>
              </div>
            </Link>
          </div>
          )
         
        })}

      </div>
    </div>
  );
}
