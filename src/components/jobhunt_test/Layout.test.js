import Layout from "../Layout";
import { render, screen,waitFor,fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Layout component", () => {
    beforeEach(() => {
      
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
  
    
    await waitFor(() => {
      const jobHuntText = screen.getByText("Job Hunt");
      expect(jobHuntText).toBeInTheDocument();
    });
  });

  test("logs out user when logout button is clicked", () => {
    
    window.localStorage.getItem.mockReturnValueOnce("test@example.com");

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    
    fireEvent.click(screen.getByText("Logout"));

   
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("email");
  });





})