import { getListings, getListingById } from "../src/controllers/listings.controller";
import { ListingModel } from "../src/models/listing.model";
import { Request, Response } from "express";

// Mock Mongoose model
jest.mock("../src/models/listing.model");

describe("Listings Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    mockRes = {
      json: jsonMock,
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("getListings", () => {
    it("should return listings with pagination", async () => {
      (ListingModel.aggregate as jest.Mock).mockResolvedValue([
        { items: [{ title: "Test Listing" }], total: 1 },
      ]);

      mockReq = { query: { page: "1", limit: "10" } };

      await getListings(mockReq as Request, mockRes as Response, jest.fn());

      expect(ListingModel.aggregate).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({
        data: [{ title: "Test Listing" }],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      });
    });
  });

  describe("getListingById", () => {
    it("should return a single listing", async () => {
      (ListingModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ _id: "123", title: "Single Listing" }),
      });

      mockReq = { params: { id: "123" } };

      await getListingById(mockReq as Request, mockRes as Response, jest.fn());

      expect(ListingModel.findById).toHaveBeenCalledWith("123");
      expect(jsonMock).toHaveBeenCalledWith({
        data: { _id: "123", title: "Single Listing" },
      });
    });

    it("should return 404 if not found", async () => {
      (ListingModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      mockReq = { params: { id: "999" } };

      await getListingById(mockReq as Request, mockRes as Response, jest.fn());

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Not found" });
    });
  });
});
