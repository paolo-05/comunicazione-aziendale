declare module 'alert' {
	interface AlertProps {
		show: boolean;
		message: string;
		onClose: () => void;
	}
}
