/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // uncomment based on the requirement enviroment testing
    base_url: "https://task-manager-backend-s40k.onrender.com",
    // base_url: "http://localhost:3000",
  },
};

export default nextConfig;
