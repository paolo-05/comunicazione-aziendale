/* eslint-disable @next/next/no-img-element */
import { PostType } from '@/types/post';
import * as React from 'react';

interface PostPreviewTemplateProps {
	post: PostType;
}

export const PostPreviewTemplate: React.FC<Readonly<PostPreviewTemplateProps>> = ({ post }) => (
	<>
		<h1>{post.title}</h1>
		<img src={post.imageURL} alt={post.title} width={128} height={128} />
		<div dangerouslySetInnerHTML={{ __html: post.description }} />
		<p>Data effettiva evento: {new Date(post.actualDate).toLocaleDateString('it-IT')}</p>
	</>
);
