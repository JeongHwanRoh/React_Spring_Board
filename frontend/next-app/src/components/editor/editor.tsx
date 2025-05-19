"use client";
import { ComponentProps, FC, useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ToolbarPlugin } from "@/components/editor/plugin/ToolbarPlugin";

import "./editor.css";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "./plugin/CodeHighlightPlugin";
import { InlineToolbarPlugin } from "./plugin/InlineToolbarPlugin";
import { MarkdownPlugin } from "./plugin/MarkdownPlugin";
import { SavePlugin } from "./plugin/SavePlugin";
import { theme } from "./editorconfig/theme";
import { nodes } from "./editorconfig/nodes";
import { getPostJson } from "@/lib/services/blogService";



const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "MyEditor",
  theme,
  onError: (error) => console.log(error),
  nodes: nodes, // 에디터에서 사용할 Node 클래스 전달
};

type EditorPorps = {
  id? : number;

};



const Editor: FC<EditorPorps> =  ({id}) => {
  //const [id, setId] = useState<number | undefined>(undefined);
  const [initialJson, setInitialJson] = useState<string | null>(null);
  const [editorState, setEditorState] = useState("");
  const [title, setTitle] = useState("")


  useEffect(()=>{
    if(!id) return;

    async function fetchPost(id:number) {
      const post = await getPostJson(id);
      console.log("post : ",post)
      console.log("post title: ",post.data.title)
      setInitialJson(post.data.page_json);   // 한 번만 세팅
      setTitle(post.data.title)
      setEditorState(post.data.page_json)
    }

    fetchPost(id);
    

  },[id])
  



  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
    
    //console.log(editorStateJSON);
  }



  return (
    <div className="flex flex-col justify-center">
      <input
        type="text"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="text-xl font-semibold p-2 border-b outline-none justify-center"
      />
              
      <LexicalComposer initialConfig={initialConfig}>

        <div className="flex flex-row">
          <ToolbarPlugin />
          <InlineToolbarPlugin />
          <InitialContentLoader initialContent={initialJson} />
        </div>
        <div className="relative min-h-[150px] border border-gray-300 p-4 rounded-md">
          <RichTextPlugin
          
            contentEditable={
              <ContentEditable // 텍스트 입력이 일어나는 에디터 영역
                className="editor-input outline-none min-h-[150px]"
                aria-placeholder={"아무거나 입력하셈"}
                placeholder={
                  <div className="editor-placeholder pointer-events-none absolute top-4 left-4 text-gray-400">
                    아무거나 입력하셈
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        {/* <OnChangePlugin onChange={onChange} /> */}
        {/* undo, redo 기능 추가 */}
        <HistoryPlugin />
        {/* 리스트 기능 추가 */}
        <ListPlugin />
        {/* 체크리스트 기능 추가 */}
        <CheckListPlugin />
        {/* 코드 블록 추가 */}
        <CodeHighlightPlugin />
        {/* 마크다운 */}
        <MarkdownPlugin />
        {/*  */}
        <MyOnChangePlugin onChange={onChange} />

        <MyCustomAutoFocusPlugin />
        <SavePlugin id={id} title={title} pageJson={editorState} />
      </LexicalComposer>
    </div>
  );
};

export default Editor;



// 에디터 마운트시 자동으로 포커스 맞춰줌
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
    
  }, [editor]);

  return null;
}

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
      console.log("MyOnChangePlugin load")

    });
  }, [editor, onChange]);
  return null;
}


function InitialContentLoader({ initialContent }: { initialContent: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialContent) return;
    const editorState = editor.parseEditorState(initialContent);
    editor.setEditorState(editorState);
    console.log("InitialContentLoader load")
  }, [initialContent, editor]);

  return null;
}