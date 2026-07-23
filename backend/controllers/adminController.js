import prisma from "../utils/prisma.js";

// Admin Dashboard
export const getDashboard = async (req, res) => {
  try {
    const [userCount, productCount, categoryCount] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.category.count(),
    ]);

    res.json({
      message: "Welcome to the Admin Dashboard!",
      admin: req.user,
      counts: {
        users: userCount,
        products: productCount,
        categories: categoryCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
