namespace NodeJS {
  interface ProcessEnv {
    STACKHERO_DB_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    NEXT_PUBLIC_CLOUDINARY_BASE_URL: string;
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
    NEXT_PUBLIC_PROFILE_LINK: string;
  }
}
