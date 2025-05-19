import Editor from "@/components/editor/editor";

export default async function PostPage({ params }: { params: { id: string } }) {
    const {id} = await params
    const idNumber = await Number(id)
    return (
        <Editor id={idNumber}/>
    );
}