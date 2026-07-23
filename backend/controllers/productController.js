import prisma from "../utils/prisma.js";

const getUploadedImageUrl = (req) => {
  if (!req.file) return "";

  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/uploads/${req.file.filename}`;
};

const normalizeImageUrl = (value) =>
  typeof value === "string" ? value.trim() : "";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const normalizedName = name?.trim();
    const normalizedDescription = description?.trim();
    const normalizedCategoryId = categoryId?.trim();
    const parsedPrice = Number.parseFloat(price);
    const imageUrl =
      getUploadedImageUrl(req) || normalizeImageUrl(req.body.imageUrl);

    if (!normalizedName || !normalizedDescription || !normalizedCategoryId) {
      return res
        .status(400)
        .json({ message: "Name, description, price, and category are required." });
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a valid number greater than 0." });
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "A product photo is required." });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: normalizedName,
        price: parsedPrice,
        description: normalizedDescription,
        imageUrl,
        categoryId: normalizedCategoryId,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      categoryId,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const validSortBy = ["createdAt", "price", "name"];
    const validOrder = ["asc", "desc"];
    const safeSortBy = validSortBy.includes(sortBy) ? sortBy : "createdAt";
    const safeOrder = validOrder.includes(order) ? order : "desc";

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const where = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: {
        [safeSortBy]: safeOrder,
      },
      skip: skip,
      take: limitNumber,
    });

    const totalProducts = await prisma.product.count({ where });

    res.json({
      data: products,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, description, imageUrl, categoryId } = req.body;
    const normalizedName = name?.trim();
    const normalizedDescription = description?.trim();
    const normalizedCategoryId = categoryId?.trim();
    const parsedPrice = Number.parseFloat(price);
    const nextImageUrl =
      getUploadedImageUrl(req) ||
      normalizeImageUrl(imageUrl) ||
      existingProduct.imageUrl ||
      "";

    if (!normalizedName || !normalizedDescription || !normalizedCategoryId) {
      return res
        .status(400)
        .json({ message: "Name, description, price, and category are required." });
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a valid number greater than 0." });
    }

    if (!nextImageUrl) {
      return res.status(400).json({ message: "A product photo is required." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: normalizedName,
        price: parsedPrice,
        description: normalizedDescription,
        imageUrl: nextImageUrl,
        categoryId: normalizedCategoryId,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
