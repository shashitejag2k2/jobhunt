import Layout from "../Layout";
import { render, screen,waitFor,fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Layout component", () => {
    beforeEach(() => {
      // Mock localStorage
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
        writable: true,
      });
    });


test("renders Typography component with correct text", async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  
    // Use waitFor to wait for the text to appear
    await waitFor(() => {
      const jobHuntText = screen.getByText("Job Hunt");
      expect(jobHuntText).toBeInTheDocument();
    });
  });

  test("logs out user when logout button is clicked", () => {
    // Mock localStorage to simulate user logged in
    window.localStorage.getItem.mockReturnValueOnce("test@example.com");

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Click on the logout button
    fireEvent.click(screen.getByText("Logout"));

    // Assert that localStorage.removeItem was called with "email"
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("email");
  });

//   test("navigates to profile page when profile menu item is clicked", () => {
//     // Mock localStorage to simulate user logged in as job seeker
//     window.localStorage.getItem.mockReturnValueOnce("test@example.com");
//     window.localStorage.getItem.mockReturnValueOnce("jobseeker");

//     const navigateMock = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useNavigate: () => navigateMock,
//     }));

//     render(
//       <MemoryRouter>
//         <Layout />
//       </MemoryRouter>
//     );

//     // Click on the account settings button
//     fireEvent.click(screen.getByTitle("Account settings"));

//     // Click on the profile menu item
//     fireEvent.click(screen.getByText("Profile"));

//     // Assert that useNavigate was called with "/profile"
//     expect(navigateMock).toHaveBeenCalledWith("/profile");
//   });



})