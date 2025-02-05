/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    reactStrictMode: false,
    includePaths: ["asset"], // styles 폴더를 SCSS 파일의 경로로 설정
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_GOGGLE_API,
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_GOGGLE_USER,
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
