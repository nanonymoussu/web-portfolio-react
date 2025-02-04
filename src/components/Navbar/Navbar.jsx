import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

import { useTheme } from '../../hooks/useTheme';

const NavItem = ({ to, children }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => `relative text-sm uppercase tracking-wider font-medium ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'} transition-colors
      `}
			role="menuitem"
		>
			{({ isActive }) => (
				<motion.span className='relative py-2' whileHover={{ scale: 1.05 }}>
					{children}
					{isActive && (
						<motion.span
							layoutId='underline'
							className='absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600'
							initial={false}
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
						/>
					)}
				</motion.span>
			)}
		</NavLink>
	);
};

NavItem.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const Navbar = () => {
	const { darkMode, toggleTheme } = useTheme();

	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Navigation bar menu items
	const menuItems = [
		{ title: 'หน้าแรก', to: '/' },
		{ title: 'เกี่ยวกับ', to: '/about' },
		{ title: 'ผลงาน', to: '/projects' },
		{ title: 'ติดต่อ', to: '/contact' },
	];

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			setIsOpen(!isOpen);
		}
	};

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-500
			${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
			role="navigation"
			aria-label="Main navigation"
		>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='flex items-center justify-between h-20'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
					>
						Your Name
					</motion.div>

					{/* Desktop Menu */}
					<div className='hidden md:flex items-center space-x-8' role="menubar">
						{menuItems.map((item) => (
							<NavItem key={item.title} to={item.to}>
								{item.title}
							</NavItem>
						))}

						{/* Theme Toggle Button */}
						<motion.button
							onClick={toggleTheme}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
						>
							{darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
						</motion.button>
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center space-x-4'>
						<motion.button
							onClick={toggleTheme}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
							whileTap={{ scale: 0.95 }}
							aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
						>
							{darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
						</motion.button>

						<motion.button
							onClick={() => setIsOpen(!isOpen)}
							onKeyPress={handleKeyPress}
							className='text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
							whileTap={{ scale: 0.95 }}
							aria-expanded={isOpen}
							aria-controls="mobile-menu"
							aria-label="Toggle mobile menu"
						>
							{isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
						</motion.button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<motion.div
				id="mobile-menu"
				initial={false}
				animate={{
					height: isOpen ? 'auto' : 0,
					opacity: isOpen ? 1 : 0,
				}}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				className='md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
				role="menu"
				aria-label="Mobile navigation menu"
			>
				<div className='px-6 py-4 space-y-3'>
					{menuItems.map((item) => (
						<NavLink
							key={item.title}
							to={item.to}
							className={({ isActive }) => `
								block py-2 text-sm font-medium rounded-lg px-4
								${isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/50' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}
							`}
							onClick={() => setIsOpen(false)}
							role="menuitem"
						>
							{item.title}
						</NavLink>
					))}
				</div>
			</motion.div>
		</nav>
	);
};

export default Navbar;
