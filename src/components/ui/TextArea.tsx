interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea(props: TextareaProps) {
	return (
		<textarea
			className="w-full px-3 py-2 border border-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
			{...props}
		/>
	)
}
