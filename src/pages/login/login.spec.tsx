import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import Login from "./Login";

describe('Login Page', () => {
    test("should render with required fields" , () => {
        render(<Login />);
        expect(screen.getByText(/Sign In/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Log In"})).toBeInTheDocument();
        expect(screen.getByRole("checkbox", {name: "Remember Me"})).toBeInTheDocument();
        expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    })
})

