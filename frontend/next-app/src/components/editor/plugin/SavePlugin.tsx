"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useRouter } from "next/navigation";
import { $generateHtmlFromNodes } from "@lexical/html"; // editorState를 html로 변환해서 저장
import { saveBlogPost, SaveBlogPostReq, updateBlogPost } from "@/lib/services/blogService";

export const SavePlugin = ({
  id,
  title,
  pageJson,
}: {
  id?: number;
  title: string;
  pageJson: string;
}) => {
  const [editor] = useLexicalComposerContext();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const html = editor
        .getEditorState()
        .read(() => $generateHtmlFromNodes(editor, null));

      const dto: SaveBlogPostReq = {
        id,
        title,
        page_json: pageJson,
        page_html: html,
      };

      console.log("PostSaveData : ", dto);
      // id가 있는 경우(수정)
      if (dto.id) {
        console.log("update go")
        console.log(dto.title)
        const res = await updateBlogPost(dto);
        if (res.status === 200) {
            router.push(`/blog/${dto.id}`);
          }

      } else {
        // id가 없는 경우
        const res = await saveBlogPost(dto);

        if (res.status === 200) {
          router.push("/blog");
        }
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <button className=" ml-auto bg-blue-100 m-2 w-20" onClick={handleSave}>
      {" "}
      저장하기{" "}
    </button>
  );
};
