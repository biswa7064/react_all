require("@testing-library/jest-dom")
jest.mock("@auth0/nextjs-auth0", () => ({
	getSession: jest.fn(),
	withApiAuthRequired: jest.fn((handler) => handler),
	withPageAuthRequired: jest.fn((component) => component),
	useUser: jest.fn(() => ({ user: null, error: null, isLoading: false }))
}))
