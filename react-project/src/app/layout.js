// app/layout.js
'use client';
import { GlobalProvider } from '../context/GlobalContext';
import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
	const pathname = usePathname();
	const isLoginPage = pathname !== '/' && pathname !== '/register';

	return (
		<html lang="en">
			<body>
				<GlobalProvider>
					{isLoginPage && <NavBar></NavBar>}
					<div style={{ width: '1000px', margin: 'auto', padding: '10px' }}>
						{children}
					</div>
				</GlobalProvider>
			</body>
		</html>
	);
}
