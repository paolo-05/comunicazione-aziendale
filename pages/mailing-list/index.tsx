import { useRouter } from 'next/router';

export default function MailingList() {
	const router = useRouter();
	return (
		<>
			<h1>Non c&apos;è ancora niente qui...</h1>
			<br />
			<button onClick={() => router.back()}>Torna indietro</button>
		</>
	);
}
