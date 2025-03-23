import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Form from "../components/Form";
import { IBannerForm } from "../utils/type";
import userEvent from "@testing-library/user-event";

describe("Form Component", () => {
  let mockSetBannerData: ReturnType<typeof vi.fn>;
  let bannerData: IBannerForm["bannerData"];

  beforeEach(() => {
    mockSetBannerData = vi.fn();
    bannerData = {
      bannerText: "Welcome to My Website",
      bannerBg: "/assets/img/bg.jpg",
      bannerImg: "/assets/img/small.jpg",
      bannerDesc: "A short description about the website",
    };
  });

  it("renders the form correctly", () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByText(/edit the banner/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Change banner text")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Change banner description")
    ).toBeInTheDocument();
  });

  it("calls setBannerData with updated text and description on submit", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const textInput = screen.getByPlaceholderText("Change banner text");
    const descInput = screen.getByPlaceholderText("Change banner description");
    const submitButton = screen.getByRole("button", {
      name: /update all text/i,
    });

    await userEvent.clear(textInput);
    await userEvent.type(textInput, "New Banner Text");
    await userEvent.clear(descInput);
    await userEvent.type(descInput, "New Banner Description");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });

    await waitFor(() => {
      mockSetBannerData.mock.calls[0][0]((prev: any) => {
        expect(prev.bannerText).toBe("New Banner Text");
        expect(prev.bannerDesc).toBe("New Banner Description");
        return prev;
      });
    });
  });

  it("updates bannerText when 'Update Text' button is clicked", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const textInput = screen.getByPlaceholderText("Change banner text");
    const updateTextButton = screen.getByRole("button", {
      name: /update text/i,
    });

    await userEvent.clear(textInput);
    await userEvent.type(textInput, "Updated Banner Text");
    await userEvent.click(updateTextButton);

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("updates bannerDesc when 'Update Desc' button is clicked", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const descInput = screen.getByPlaceholderText("Change banner description");
    const updateDescButton = screen.getByRole("button", {
      name: /update desc/i,
    });

    await userEvent.clear(descInput);
    await userEvent.type(descInput, "Updated Banner Description");
    await userEvent.click(updateDescButton);

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("updates the banner image when file is uploaded", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const fileInput = screen.getByLabelText("Change Banner Background");
    const file = new File(["dummy content"], "banner.jpg", {
      type: "image/jpeg",
    });

    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("displays validation errors when fields are empty", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const bannerTextInput = screen.getByPlaceholderText("Change banner text");
    const bannerDescInput = screen.getByPlaceholderText(
      "Change banner description"
    );

    await userEvent.type(bannerDescInput, " ");
    await userEvent.clear(bannerDescInput);
    await userEvent.type(bannerTextInput, " ");
    await userEvent.clear(bannerTextInput);

    expect(
      await screen.findByText(/banner text is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/banner description is required/i)
    ).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const submitButton = screen.getByRole("button", {
      name: /update all text/i,
    });

    await userEvent.clear(screen.getByPlaceholderText("Change banner text"));
    await userEvent.clear(
      screen.getByPlaceholderText("Change banner description")
    );

    expect(submitButton).toBeDisabled();
  });

  it("enables the 'Update Text' button when bannerText is changed", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const textInput = screen.getByPlaceholderText("Change banner text");
    const updateTextButton = screen.getByRole("button", {
      name: /update text/i,
    });

    await userEvent.type(textInput, "New Text");

    expect(updateTextButton).not.toBeDisabled();
  });

  it("enables the 'Update Desc' button when bannerDesc is changed", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const descInput = screen.getByPlaceholderText("Change banner description");
    const updateDescButton = screen.getByRole("button", {
      name: /update desc/i,
    });

    await userEvent.type(descInput, "New Description");

    expect(updateDescButton).not.toBeDisabled();
  });

  it("does not update bannerText if 'Update Text' button is clicked without changing the text", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const updateTextButton = screen.getByRole("button", {
      name: /update text/i,
    });

    await userEvent.click(updateTextButton);

    await waitFor(() => {
      expect(mockSetBannerData).not.toHaveBeenCalled();
    });
  });

  it("does not update bannerDesc if 'Update Desc' button is clicked without changing the description", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const updateDescButton = screen.getByRole("button", {
      name: /update desc/i,
    });

    await userEvent.click(updateDescButton);

    await waitFor(() => {
      expect(mockSetBannerData).not.toHaveBeenCalled();
    });
  });

  it("handles file input correctly for small image", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const fileInput = screen.getByLabelText("Change Banner Small Image");
    const file = new File(["dummy content"], "small.jpg", {
      type: "image/jpeg",
    });

    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("keeps the 'Update All text' button disabled if form is invalid after changes", async () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    const textInput = screen.getByPlaceholderText("Change banner text");
    const descInput = screen.getByPlaceholderText("Change banner description");
    const submitButton = screen.getByRole("button", {
      name: /update all text/i,
    });

    await userEvent.clear(textInput);
    await userEvent.clear(descInput);

    expect(submitButton).toBeDisabled();
  });

  it("displays the correct initial text in inputs", () => {
    render(<Form bannerData={bannerData} setBannerData={mockSetBannerData} />);

    expect(screen.getByPlaceholderText("Change banner text")).toHaveValue("");
    expect(
      screen.getByPlaceholderText("Change banner description")
    ).toHaveValue("");
  });
});
