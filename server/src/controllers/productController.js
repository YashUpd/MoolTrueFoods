import prisma from '../db.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../middleware/uploadMiddleware.js'

// GET /api/products — Public: Fetch all available products
export const getProducts = async (req, res) => {
  try {
    const { category, available } = req.query

    const where = {}
    if (category && category !== 'All') {
      where.category = category
    }
    if (available !== undefined) {
      where.isAvailable = available === 'true'
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    res.json({ success: true, data: products })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Failed to fetch products.' })
  }
}

// GET /api/products/:id — Public: Fetch single product
export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    res.json({ success: true, data: product })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Failed to fetch product.' })
  }
}

// POST /api/products — Admin: Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name, category, price, weight,
      description, sourcing, rating, reviewsCount,
      nutrition, isAvailable,
    } = req.body

    // Validate required fields
    if (!name || !category || !price || !weight || !description || !sourcing) {
      return res.status(400).json({ error: 'Missing required fields.' })
    }

    let image = req.body.imageUrl || ''
    let imagePublicId = null

    // Upload image to Cloudinary if a file was provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer)
      image = result.secure_url
      imagePublicId = result.public_id
    }

    if (!image) {
      return res.status(400).json({ error: 'Product image is required.' })
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        weight,
        image,
        imagePublicId,
        description,
        sourcing,
        rating: parseFloat(rating) || 4.5,
        reviewsCount: parseInt(reviewsCount) || 0,
        nutrition: nutrition ? (typeof nutrition === 'string' ? JSON.parse(nutrition) : nutrition) : {},
        isAvailable: isAvailable !== undefined ? isAvailable === 'true' || isAvailable === true : true,
      },
    })

    res.status(201).json({ success: true, data: product })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Failed to create product.' })
  }
}

// PUT /api/products/:id — Admin: Update a product
export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const existing = await prisma.product.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    let image = existing.image
    let imagePublicId = existing.imagePublicId

    // If a new image file was uploaded, replace it
    if (req.file) {
      // Delete old image from Cloudinary
      if (existing.imagePublicId) {
        await deleteFromCloudinary(existing.imagePublicId)
      }
      const result = await uploadToCloudinary(req.file.buffer)
      image = result.secure_url
      imagePublicId = result.public_id
    }

    const {
      name, category, price, weight,
      description, sourcing, rating, reviewsCount,
      nutrition, isAvailable,
    } = req.body

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        category: category ?? existing.category,
        price: price ? parseFloat(price) : existing.price,
        weight: weight ?? existing.weight,
        image,
        imagePublicId,
        description: description ?? existing.description,
        sourcing: sourcing ?? existing.sourcing,
        rating: rating ? parseFloat(rating) : existing.rating,
        reviewsCount: reviewsCount ? parseInt(reviewsCount) : existing.reviewsCount,
        nutrition: nutrition
          ? (typeof nutrition === 'string' ? JSON.parse(nutrition) : nutrition)
          : existing.nutrition,
        isAvailable: isAvailable !== undefined
          ? isAvailable === 'true' || isAvailable === true
          : existing.isAvailable,
      },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ error: 'Failed to update product.' })
  }
}

// DELETE /api/products/:id — Admin: Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const existing = await prisma.product.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({ error: 'Product not found.' })
    }

    // Delete image from Cloudinary
    if (existing.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId)
    }

    await prisma.product.delete({ where: { id } })

    res.json({ success: true, message: 'Product deleted successfully.' })
  } catch (error) {
    console.error('Delete product error:', error)
    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Cannot delete product — it is linked to existing orders.',
      })
    }
    res.status(500).json({ error: 'Failed to delete product.' })
  }
}
