/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // ビルド時の変数省略化とかを無効にする。
        // 無効にしないとPromise-mySQLがビルド後に動かない。
        config.optimization.minimize = false;
        return config;
    }
};

export default nextConfig;
