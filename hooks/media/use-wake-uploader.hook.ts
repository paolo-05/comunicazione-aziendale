import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Wake up the uploader hosted on render.com
 */
export const useWakeUploader = () => {
	const url: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOADER_URL;

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((res) => console.log(res))
			.finally(() => setLoading(false));
	}, [url]);

	return { loading };
};
