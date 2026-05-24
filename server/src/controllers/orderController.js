import prisma from '../db.js'

// POST /api/orders — Public: Place a new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName, customerEmail, customerPhone,
      deliveryAddress, city, pincode, state,
      totalAmount, discountAmount, deliveryFee, gstAmount, grandTotal,
      paymentMethod, items, // items: [{ productId, quantity, price }]
      razorpayOrderId,
    } = req.body

    // Basic validation
    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required order fields.' })
    }

    // Generate a unique order number
    const orderNumber = `MTF-${Math.floor(100000 + Math.random() * 900000)}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        city,
        pincode,
        state,
        totalAmount: parseFloat(totalAmount),
        discountAmount: parseFloat(discountAmount) || 0,
        deliveryFee: parseFloat(deliveryFee) || 60,
        gstAmount: parseFloat(gstAmount) || 0,
        grandTotal: parseFloat(grandTotal),
        paymentMethod, // "cod" | "razorpay"
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
        orderStatus: 'pending',
        razorpayOrderId: razorpayOrderId || null,
        orderItems: {
          create: items.map((item) => ({
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          })),
        },
      },
      include: { orderItems: { include: { product: true } } },
    })

    res.status(201).json({ success: true, data: order })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ error: 'Failed to place order.' })
  }
}

// GET /api/orders — Admin: Get all orders with filters
export const getOrders = async (req, res) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const where = {}
    if (status) where.orderStatus = status
    if (paymentStatus) where.paymentStatus = paymentStatus

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: {
            include: { product: { select: { id: true, name: true, image: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ])

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: 'Failed to fetch orders.' })
  }
}

// GET /api/orders/:id — Admin: Get single order details
export const getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        orderItems: { include: { product: true } },
      },
    })

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' })
    }

    res.json({ success: true, data: order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ error: 'Failed to fetch order.' })
  }
}

// PATCH /api/orders/:id — Admin: Update order or payment status
export const updateOrderStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { orderStatus, paymentStatus } = req.body

    const validOrderStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    const validPaymentStatuses = ['pending', 'paid', 'failed']

    if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status.' })
    }
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status.' })
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
      },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    console.error('Update order error:', error)
    res.status(500).json({ error: 'Failed to update order status.' })
  }
}

// GET /api/orders/stats — Admin: Dashboard statistics
export const getOrderStats = async (req, res) => {
  try {
    const [
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      totalProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { grandTotal: true },
        where: { paymentStatus: 'paid' },
      }),
      prisma.order.count({ where: { orderStatus: 'pending' } }),
      prisma.order.count({ where: { orderStatus: 'delivered' } }),
      prisma.product.count({ where: { isAvailable: true } }),
    ])

    // Recent 7 orders
    const recentOrders = await prisma.order.findMany({
      take: 7,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, orderNumber: true, customerName: true,
        grandTotal: true, orderStatus: true, paymentStatus: true, createdAt: true,
      },
    })

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue._sum.grandTotal || 0,
        pendingOrders,
        deliveredOrders,
        totalProducts,
        recentOrders,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard statistics.' })
  }
}
