import React, { Component, ErrorInfo, ReactNode } from "react"

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
	errorMessage: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false, errorMessage: "" }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Update state so the next render will show the error message
		return { hasError: true, errorMessage: error.message }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can log the error to an error reporting service here
		console.error("Uncaught error:", error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// Render error message in a p tag
			return <p data-testid="err-msg">Error: {this.state.errorMessage}</p>
		}

		return this.props.children
	}
}

export default ErrorBoundary
