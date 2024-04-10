import { Session } from 'next-auth';
import Link from 'next/link';
import { HomeIcon, NextPostIcon, PreviousPostIcon } from '../svg';

interface NavigationButtonsProps {
	nextPostId: number | undefined;
	previousPostId: number | undefined;
	session: Session | null;
}

export const NavigationButtons = ({ nextPostId, previousPostId, session }: NavigationButtonsProps): JSX.Element => {
	const renderPreviousPostButton = () => {
		if (!previousPostId) {
			return (
				<button
					type='button'
					className='text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-right inline-flex items-center dark:focus:ring-primary-700/55 me-2 mb-2'
					disabled
				>
					<PreviousPostIcon className='mr-1 w-6 h-6 text-white' />
					Annuncio Precedente
				</button>
			);
		}
		return (
			<Link
				href={`/post/${previousPostId ?? 0}`}
				className='text-white bg-primary-700 hover:bg-primary-700/90 focus:ring-4 focus:outline-none focus:ring-primary-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary-700/55 me-2 mb-2'
			>
				<PreviousPostIcon className='mr-1 w-6 h-6 text-white' />
				Annuncio Precedente
			</Link>
		);
	};

	const renderNextPostButton = () => {
		if (!nextPostId) {
			return (
				<button
					type='button'
					className='text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-right inline-flex items-center dark:focus:ring-primary-700/55 me-2 mb-2'
					disabled
				>
					Prossimo Annuncio
					<NextPostIcon className='ml-1 w-6 h-6 text-white' />
				</button>
			);
		}
		return (
			<Link
				href={`/post/${nextPostId}`}
				className='text-white bg-primary-700 hover:bg-primary-700/90 focus:ring-4 focus:outline-none focus:ring-primary-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-right inline-flex items-center dark:focus:ring-primary-700/55 me-2 mb-2'
			>
				Prossimo Annuncio
				<NextPostIcon className='ml-1 w-6 h-6 text-white' />
			</Link>
		);
	};

	return (
		<div className='flex items-center justify-between'>
			{renderPreviousPostButton()}
			<Link
				href={session?.user != null ? '/dashboard' : '/'}
				className='text-white bg-primary-700 hover:bg-primary-700/90 focus:ring-4 focus:outline-none focus:ring-primary-700/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-primary-700/55 me-2 mb-2'
			>
				<HomeIcon className='ml-1 w-6 h-6 text-white' />
				Torna alla Home
			</Link>
			{renderNextPostButton()}
		</div>
	);
};
