/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    reactStrictMode: false,
    includePaths: ["asset"], // styles 폴더를 SCSS 파일의 경로로 설정
    prependData: `@import "@/asset/_mixin.scss";`, // _mixin.scss 파일의 경로를 정확히 설정
  },
};

export default nextConfig;
