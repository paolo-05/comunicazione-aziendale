import { type AlertProps } from 'alert';
import React from 'react';
import { DangerIcon } from '../svg';

export const DangerAlert = ({ show, message, onClose }: AlertProps): React.ReactElement => {
	if (!show) {
		return <></>;
	}

	return (
		<div
			id='alert-danger'
			className='flex items-center p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
			role='alert'
		>
			<DangerIcon className='flex-shrink-0 w-4 h-4' />
			<span className='sr-only'>Info</span>
			<div className='ms-3 text-sm font-medium'>{message}</div>
			<button
				type='button'
				className='ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
				aria-label='Close'
				onClick={onClose}
			>
				<span className='sr-only'>Close</span>
			</button>
		</div>
	);
};
