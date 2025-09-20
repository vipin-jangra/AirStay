import { Request, Response, NextFunction } from "express";
import { ListingModel } from "../models/listing.model";

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = "1", limit = "12", q, minPrice, maxPrice, sortBy, sortOrder = "desc" } = req.query as any;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const match: any = {};

    // Flexible search using regex
    if (q) {
      const searchRegex = new RegExp(q, "i");
      match.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { city: searchRegex },
        { neighborhood: searchRegex },
        { address: searchRegex },
      ];
    }

    // Apply price filter only if minPrice/maxPrice exist
    if (minPrice || maxPrice) {
      match.pricePerNight = {};
      if (minPrice) match.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) match.pricePerNight.$lte = Number(maxPrice);
    }

    // Sorting
    const order = sortOrder === "asc" ? 1 : -1;
    let sortStage: any = { createdAt: -1 };
    if (sortBy) {
      if (sortBy === "price" || sortBy === "pricePerNight") sortStage = { pricePerNight: order };
      else if (sortBy === "rating") sortStage = { rating: order };
    }

    const pipeline: any[] = [];
    if (Object.keys(match).length > 0) pipeline.push({ $match: match });
    pipeline.push({ $sort: sortStage });

    // Pagination + total
    pipeline.push({
      $facet: {
        items: [{ $skip: skip }, { $limit: limitNum }],
        total: [{ $count: "count" }],
      },
    });

    pipeline.push({
      $project: {
        items: 1,
        total: { $arrayElemAt: ["$total.count", 0] },
      },
    });

    const result = await ListingModel.aggregate(pipeline);

    const items = result[0]?.items || [];
    const total = result[0]?.total || 0;

    res.json({
      data: items,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};


export const getListingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const item = await ListingModel.findById(id).lean();
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
};
