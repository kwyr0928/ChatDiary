import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // テーマカラー変更1
        theme0: {
          // red
          primary: "#F85D88", //"#f87171", // ボタン,アイコン
          background: "#FEEEF0", //"#fef2f2", // 背景
          hover: "#B388FF", // ボタンhover
        },
        theme1: {
          // yellow
          primary: "#F2B01E", //"#f4a460",
          background: "#FFF9E2", //"#fffacd",
          hover: "#4D66C2",
        },
        theme2: {
					// green
          primary: "#32BF84", //"#f4a460",
          background: "#E8FBF3", //"#fffacd",
          hover: "#E5BC0E",
        },
        theme3: {
          // blue
          primary: "#145FB2",
          background: "#EBF4FE", //"#e0f3f8",
          hover: "#79339F",
        },
        theme4: {
          // purple
          primary: "#8F55DB", //"#f4a460",
          background: "#F0ECFF", //"#fffacd",
          hover: "#DB5599",
        },
        theme5: {
          // monochrome
          primary: "#55555F",
          background: "#FAFAFA",
          hover: "#232329",
        },
        theme6: {
          // dark
          primary: "#F8F8F8",
          background: "#2F2F2F",
          hover: "#A5A5A5",
        },
      },
    },
  },
  // テーマカラー変更2 1色8種類　事前に生成　先に別の方法あるかな？
  safelist: [
    "bg-theme0-background", // 1
    "bg-theme0-primary", // 2
    "hover:bg-theme0-hover", // 3
    "text-theme0-primary", // 4
    "border-theme0-primary", // 5
    "fill-theme0-primary", // 6
    "data-[state=checked]:bg-theme0-primary", // 7
    "data-[state=checked]:border-theme0-primary", // 8
    "bg-theme1-background",
    "bg-theme1-primary",
    "hover:bg-theme1-hover",
    "text-theme1-primary",
    "border-theme1-primary",
    "fill-theme1-primary",
    "data-[state=checked]:bg-theme1-primary",
    "data-[state=checked]:border-theme1-primary",
    "bg-theme2-background",
    "bg-theme2-primary",
    "hover:bg-theme2-hover",
    "text-theme2-primary",
    "border-theme2-primary",
    "fill-theme2-primary",
    "data-[state=checked]:bg-theme2-primary",
    "data-[state=checked]:border-theme2-primary",
    "bg-theme3-background",
    "bg-theme3-primary",
    "hover:bg-theme3-hover",
    "text-theme3-primary",
    "border-theme3-primary",
    "fill-theme3-primary",
    "data-[state=checked]:bg-theme3-primary",
    "data-[state=checked]:border-theme3-primary",
		"bg-theme4-background",
    "bg-theme4-primary",
    "hover:bg-theme4-hover",
    "text-theme4-primary",
    "border-theme4-primary",
    "fill-theme4-primary",
    "data-[state=checked]:bg-theme4-primary",
    "data-[state=checked]:border-theme4-primary",
		"bg-theme5-background",
    "bg-theme5-primary",
    "hover:bg-theme5-hover",
    "text-theme5-primary",
    "border-theme5-primary",
    "fill-theme5-primary",
    "data-[state=checked]:bg-theme5-primary",
    "data-[state=checked]:border-theme5-primary",
		"bg-theme6-background",
    "bg-theme6-primary",
    "hover:bg-theme6-hover",
    "text-theme6-primary",
    "border-theme6-primary",
    "fill-theme6-primary",
    "data-[state=checked]:bg-theme6-primary",
    "data-[state=checked]:border-theme6-primary",
  ],
  plugins: [tailwindcssAnimate],
} satisfies Config;
