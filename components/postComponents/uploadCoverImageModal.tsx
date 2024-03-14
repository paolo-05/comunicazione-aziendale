import { useUpload } from '@/hooks/media';
import { ButtonChange, ButtonClose, ButtonFile, Dropzone, PreviewImage, ProgressCard } from '../media';
import { type UploadCoverImageModalProps } from '@/types/post';
import React from 'react';

export const UploadCoverImageModal = ({
	show,
	onClose,
	imageURL,
	setImageURL,
}: UploadCoverImageModalProps): React.ReactElement => {
	const u = useUpload({
		imageURL,
		show,
		onClose,
		setImageURL,
	});

	if (!show) return <></>;

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 '>
			{!u.isFetching && (
				<div
					{...u.getRootProps({ className: 'dropzone' })}
					className='w-full sm:w-[402px] h-[469px] p-8 bg-gray-50 dark:bg-gray-800 sm:bg-white dark:sm:bg-gray-800 rounded-xl shadow-none sm:shadow-lg sm:shadow-gray-200/80 dark:sm:shadow-gray-900/80'
				>
					<div className='relative w-full h-full flex gap-6 flex-col justify-evenly items-center'>
						<button
							type='button'
							className='absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white'
							onClick={onClose}
						>
							<svg className='w-3 h-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
								/>
							</svg>
							<span className='sr-only'>Close modal</span>
						</button>
						<h2 className='text-xl text-gray-600 dark:text-gray-100 text-center font-semibold'>
							{u.isSuccess || (imageURL != null && !u.wantsToChange)
								? 'Caricata con successo!'
								: "Carica l'immagine di copertina"}
						</h2>

						{!u.isSuccess && u.wantsToChange && (
							<p className='text-xs sm:text-sm text-gray-500 dark:text-gray-200 text-center font-medium'>
								Tipi di file ammessi: Jpeg, Png, Gif
							</p>
						)}

						{u.image != null && !u.wantsToChange ? (
							<PreviewImage imageUrl={u.image.secure_url} />
						) : imageURL != null && !u.wantsToChange ? (
							<PreviewImage imageUrl={imageURL} />
						) : (
							<Dropzone isActive={u.isDragActive} onInputProps={u.getInputProps} />
						)}

						{(u.image != null || imageURL != null) && !u.wantsToChange && (
							<ButtonChange
								onClick={() => {
									u.setWantsToChange(true);
								}}
							/>
						)}

						{(!(u.image != null || imageURL != null) || u.wantsToChange) && (
							<span className='text-xs text-gray-400 dark:text-gray-300 font-medium'>Oppure,</span>
						)}

						{(!(u.image != null || imageURL != null) || u.wantsToChange) && (
							<ButtonFile onClick={() => u.inputRef.current?.click()} inputRef={u.inputRef} onChange={u.onChangeFile} />
						)}

						{(u.isSuccess || (imageURL != null && !u.wantsToChange)) && <ButtonClose onClick={onClose} />}
					</div>
				</div>
			)}

			{u.isFetching && <ProgressCard progressStatus={u.progressStatus} />}
		</div>
	);
};
