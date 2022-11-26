/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    redirects: async () => {
        return [
            {
                destination: 'https://github.com/discordfrens',
                source: '/github',
                permanent: false,
            },
            {
                destination: 'https://twitter.com/frensofdiscord',
                source: '/twitter',
                permanent: false,
            },
            {
                destination: 'https://discord.gg/a9AmhF3YQM',
                source: '/discord',
                permanent: false,
            },
            {
                destination: 'https://learn.discordfrens.com',
                source: '/learn',
                permanent: false,
            },
            {
                destination: '/api/auth/logout',
                source: '/logout',
                permanent: false,
            },
            {
                destination: '/api/auth',
                source: '/login',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
