import { TargetCategories } from '@/components/categoryComponents';
import Header from '@/components/navbar/';
import { CalendarIcon } from '@/components/svg';
import { Container, Skeleton } from '@/components/ui';
import { useAllVisiblePosts } from '@/hooks/post';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home(): React.ReactElement {
	const { data: session } = useSession();

	const { posts, today } = useAllVisiblePosts();

	const renderPosts = () => {
		if (posts.length == 0 || posts == null) {
			return <Skeleton />;
		}
		return posts.map((post) => {
			const areEqual =
				new Date(post?.actualDate ?? '').toLocaleString('it-IT', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				}) == today.toLocaleString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
			return (
				<div
					key={post.id}
					className={`flex flex-col items-center justify-center rounded-lg p-6 ${
						areEqual ? 'bg-primary-700 text-white font-bold' : 'bg-gray-100 max-w-lg dark:bg-gray-900'
					}`}
				>
					<h2 className='font-semibold underline text-3xl mb-1'>{post.title}</h2>
					<Link href={`/post/${post.id}`}>
						<Image
							src={post.imageURL}
							alt={post.title}
							width={500}
							height={500}
							loading='lazy'
							className='rounded-lg max-h-40 w-fit'
						/>
						<hr className='h-px my-4 dark:bg-gray-200 border-0 bg-gray-700' />
						<div className='flex items-center gap-2 mb-1'>
							<CalendarIcon className='w-6 h-6 mr-2' />
							{areEqual ? (
								<span className='text-sm font-bold'> Accade proprio oggi! </span>
							) : (
								<span className='text-sm font-medium'>
									{new Date(post?.actualDate ?? '').toLocaleString('it-IT', {
										day: '2-digit',
										month: 'long',
										year: 'numeric',
									})}
								</span>
							)}
						</div>
						<TargetCategories categories={post.targets} />
					</Link>
				</div>
			);
		});
	};

	return (
		<>
			<Head>
				<title>Prossimi Eventi</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<main className={inter.className}>
				<Header session={session} />
				<section className='py-20 min-h-screen flex items-center justify-center'>
					<Container>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-4'>{renderPosts()}</div>
					</Container>
				</section>
			</main>
		</>
	);
}
