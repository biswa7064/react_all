import { ReactNode } from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode
}

export default function Label({ children, ...props }: LabelProps) {
	return (
		<label className="block text-sm font-medium !text-gray-700" {...props}>
			{children}
		</label>
	)
}
