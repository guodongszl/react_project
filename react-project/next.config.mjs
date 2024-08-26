/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		username: '',
	},
	serverRuntimeConfig: {
		anotherGlobalVar: 'This is a server-only config variable',
	},

};

export default nextConfig;
