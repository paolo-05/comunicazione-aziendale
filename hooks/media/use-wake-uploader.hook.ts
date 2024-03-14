import { wakeUploader } from '@/lib';
import { useEffect } from 'react';

/**
 * Wake up the uploader hosted on render.com
 */
export const useWakeUploader = () => {
	useEffect(() => {
		void (async () => {
			await wakeUploader();
		})();
	}, []);
};
