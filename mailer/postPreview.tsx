/* eslint-disable @next/next/no-img-element */
import { PostType } from '@/types/post';
import * as React from 'react';

interface PostPreviewTemplateProps {
	post: PostType;
}

export const PostPreviewTemplate: React.FC<Readonly<PostPreviewTemplateProps>> = ({ post }) => {
	const processedContent = post.description.replace(
		/<img([^>]+)>/g,
		(match, attributes) => `<img ${attributes} style="max-width: 100%; height: auto;" />`, // Adjust max-width as needed
	);

	return (
		<div
			style={{
				padding: '16px',
				margin: '10px auto',
				borderRadius: '4px',
				backgroundColor: '#f5f5f5',
				boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				maxWidth: '600px',
				fontFamily: 'Inter, Arial, sans-serif',
			}}
			className='post-preview'
		>
			<h1 style={{ fontSize: '1.2em', marginBottom: '8px' }}>{post.title}</h1>
			<img
				src={post.imageURL}
				alt={post.title}
				style={{
					display: 'block',
					width: '128px',
					height: '128px',
					objectFit: 'cover',
					borderRadius: '4px',
					marginBottom: '10px',
				}}
				className='post-preview-image'
			/>
			<div
				style={{ fontSize: '0.9em', lineHeight: '1.5' }}
				className='post-preview-content'
				dangerouslySetInnerHTML={{ __html: processedContent }}
			/>
			<p style={{ fontStyle: 'italic', marginTop: '10px' }} className='post-preview-date'>
				Data effettiva evento: {new Date(post.actualDate).toLocaleDateString('it-IT')}
			</p>
		</div>
	);
};
