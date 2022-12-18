/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#6357B5',
				secondary: '#F6F6F6',
				accent: '#75fa92',
			},
		},
	},
	plugins: [],
};
