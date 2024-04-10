import { SvgProps } from '@/types/svg';

export const PreviousPostIcon = (props: SvgProps): React.ReactElement => (
	<svg
		{...props}
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m15 19-7-7 7-7' />
	</svg>
);
