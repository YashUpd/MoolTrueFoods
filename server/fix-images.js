import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultImages = [
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1574570068242-3a4f62de4757?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1615485500704-8e990f8300f7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1541990931816-7f2a3e7e1581?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1604487550833-e3c1a235290c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800'
]

async function main() {
  const products = await prisma.product.findMany()
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    if (!p.image || p.image.trim() === '' || !p.image.startsWith('http')) {
      const randomImg = defaultImages[i % defaultImages.length]
      await prisma.product.update({
        where: { id: p.id },
        data: { image: randomImg }
      })
      console.log(`Updated ${p.name} with image ${randomImg}`)
    }
  }
  console.log('All missing images updated!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
