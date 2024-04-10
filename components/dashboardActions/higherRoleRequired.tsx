export const HigherRoleRequired = (): React.ReactElement => (
	<>
		<span className='text-sm'>Non hai l&apos;autorizzazione necessaria</span>
		<svg
			className='w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100'
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
		>
			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M6 18 18 6m0 12L6 6'
			/>
		</svg>
	</>
);
