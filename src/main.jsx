import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';
import SEO from './utils/SEO';

// Lazy load components
const Home = lazy(() => import('./components/Home/Hero'));
const About = lazy(() => import('./components/About/About'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Error = lazy(() => import('./Error'));

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary>
			<HelmetProvider>
				<ThemeProvider>
					<Router>
						<App>
							<SEO
								title="Your Portfolio | Welcome"
								description="Welcome to my portfolio website. Explore my projects and skills in web development."
								name="Your Name"
							/>
							<Suspense fallback={<LoadingFallback />}>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/about' element={<About />} />
									<Route path='/projects' element={<Projects />} />
									<Route path='/contact' element={<Contact />} />
									<Route path='*' element={<Error />} />
								</Routes>
							</Suspense>
						</App>
					</Router>
				</ThemeProvider>
			</HelmetProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
