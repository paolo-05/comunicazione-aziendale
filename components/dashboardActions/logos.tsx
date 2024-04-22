import Image from 'next/image';
import Link from 'next/link';

export const Logos = (): React.ReactElement => (
	<div className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
		<Image
			className='xs:mt-3 max-h-64 max-w-fit rounded-lg h-32 md:h-64'
			alt='logo'
			src='https://res.cloudinary.com/ddygcbsoz/image/upload/f_auto,q_auto/logo'
			width={512}
			height={512}
			loading='lazy'
			priority={false}
			placeholder='data:image/svg;base64,L3BsYWNlaG9sZGVyLnN2Zw=='
		/>
		<div className='flex flex-row items-center justify-center bg-gray-100 rounded-lg mt-1'>
			<Link href='https://www.etiqube.com/' className='item'>
				<Image className='' alt='et3' src='/etiqube.png' width={100} height={100} />
			</Link>
			<Link href='https://www.etiqube.com/' className='item'>
				<Image className='' alt='et3' src='/et3.png' width={100} height={100} />
			</Link>
		</div>
	</div>
);
