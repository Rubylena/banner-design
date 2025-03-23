import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FileInput from "../components/FileInput";
import userEvent from "@testing-library/user-event";

describe("FileInput Component", () => {
  const mockSetBannerData = vi.fn();


  it("renders file input with correct label", () => {
    render(
      <FileInput
        setBannerData={mockSetBannerData}
        id="bannerBg"
        label="Upload Banner"
      />
    );

    expect(screen.getByLabelText("Upload Banner")).toBeInTheDocument();
  });

  it("calls setBannerData with base64 data when file is selected", async () => {
    render(
      <FileInput
        setBannerData={mockSetBannerData}
        id="bannerBg"
        label="Upload Banner"
      />
    );

    const fileInput = screen.getByLabelText("Upload Banner");
    const file = new File(["sample"], "test-image.jpg", { type: "image/jpeg" });

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onloadend: vi.fn(),
      result: "data:image/jpeg;base64,sampleBase64Data",
    };

    vi.stubGlobal("FileReader", function () {
      return mockFileReader;
    });

    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      mockFileReader.onloadend();
    });

    await waitFor(() => {
      expect(mockSetBannerData).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
