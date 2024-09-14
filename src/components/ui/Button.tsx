import { ReactNode } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline"
	children: ReactNode
}

export default function Button({
	variant = "default",
	children,
	...props
}: ButtonProps) {
	const baseStyles =
		"px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
	const variantStyles =
		variant === "default"
			? "bg-blue-600 text-white hover:bg-blue-700"
			: "border border-gray-300 text-foreground hover:text-gray-800 hover:bg-gray-50"

	return (
		<button className={`${baseStyles} ${variantStyles}`} {...props}>
			{children}
		</button>
	)
}
