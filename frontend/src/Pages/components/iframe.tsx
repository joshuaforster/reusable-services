export default function LetterIframe({id}:{id:string|undefined}) {
  return (
    <iframe
      src={`http://127.0.0.1:8000/letters/preview/${id}`}
      width="100%"
      height="800px"
    />
  );
}
