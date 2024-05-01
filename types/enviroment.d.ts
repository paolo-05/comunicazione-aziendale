namespace NodeJS {
	interface ProcessEnv {
		STACKHERO_DB_URL: string;
		LOCAL_DB_URL: string

		NEXTAUTH_URL: string;
		NEXTAUTH_SECRET: string;

		NEXT_PUBLIC_CLOUDINARY_BASE_URL: string;
		NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
		NEXT_PUBLIC_CLOUDINARY_UPLOADER_URL: string;

		RESEND_API_KEY: string;
	}
}
