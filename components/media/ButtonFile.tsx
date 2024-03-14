import type { ChangeEvent, FC, LegacyRef } from 'react';
import React from 'react';

interface Props {
	disabled?: boolean;
	inputRef: LegacyRef<HTMLInputElement>;
	onClick: () => void;
	onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const ButtonFile: FC<Props> = (props) => {
	const { disabled = false, inputRef, onClick, onChange } = props;

	return (
		<button
			type='button'
			className='normal-case bg-blue-500 text-gray-50 font-medium py-2.5 px-4 rounded-lg shadow-xl shadow-blue-500/50'
			onClick={onClick}
			disabled={disabled}
			title='Press to clipboard'
		>
			Scegli un file
			<input
				ref={inputRef}
				type='file'
				name='image'
				accept='image/png, image/gif, image/jpeg'
				hidden
				onChange={onChange}
			/>
		</button>
	);
};
