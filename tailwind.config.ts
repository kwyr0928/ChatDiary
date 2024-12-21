import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-geist-sans)", ...fontFamily.sans]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			// テーマカラー変更1
			theme0: { // red
				primary: "#f87171", // ボタン,アイコン
				background: "#fef2f2", // 背景
				hover: "#f43f5e", // ボタンhover
			},
			theme1: { // blue
				primary: "#274a78",
				background: "#e0f3f8",
				hover: "#674598",
			},
			theme2: { // yellow
				primary: "#f4a460",
				background: "#fffacd",
				hover: "#ffa500",
			},
			theme3: { // monochrome
				primary: "#000000",
				background: "#ffffff",
				hover: "#dcdcdc",
			},
  		}
  	}
  },
  // テーマカラー変更2 1色8種類　事前に生成　先に別の方法あるかな？
  safelist: [
    'bg-theme0-background', // 1
    'bg-theme0-primary', // 2
    'hover:bg-theme0-hover', // 3
	'text-theme0-primary', // 4
	'border-theme0-primary', // 5
	'fill-theme0-primary', // 6
	'data-[state=checked]:bg-theme0-primary', // 7
	'data-[state=checked]:border-theme0-primary', // 8
    'bg-theme1-background',
    'bg-theme1-primary',
    'hover:bg-theme1-hover',
	'text-theme1-primary',
	'border-theme1-primary',
	'fill-theme1-primary',
	'data-[state=checked]:bg-theme1-primary',
	'data-[state=checked]:border-theme1-primary',
	'bg-theme2-background',
    'bg-theme2-primary',
    'hover:bg-theme2-hover',
	'text-theme2-primary',
	'border-theme2-primary',
	'fill-theme2-primary',
	'data-[state=checked]:bg-theme2-primary',
	'data-[state=checked]:border-theme2-primary',
	'bg-theme3-background',
    'bg-theme3-primary',
    'hover:bg-theme3-hover',
	'text-theme3-primary',
	'border-theme3-primary',
	'fill-theme3-primary',
	'data-[state=checked]:bg-theme3-primary',
	'data-[state=checked]:border-theme3-primary',
	 
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
