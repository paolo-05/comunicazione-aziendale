import { useRouter } from "next/router";

type BackButtonProps = { text: string };

export default function BackButton({ text }: BackButtonProps) {
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
