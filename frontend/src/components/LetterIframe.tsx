import { API_BASE } from "../config";

export default function LetterIframe({ id }: { id: string }) {
  return (
    <iframe
      src={`${API_BASE}/letters/preview/${id}`}
      width="100%"
      height="800px"
    />
  );
}
