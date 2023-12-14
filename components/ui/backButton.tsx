import { useRouter } from "next/router";

export default function BackButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-secondary btn-lg"
      onClick={() => router.back()}
    >
      {text}
    </button>
  );
}
