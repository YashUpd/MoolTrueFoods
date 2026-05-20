import ProductCard from '../components/ProductCard'
import products from '../data/products'

function Shop() {
  return (
    <section className='px-8 py-16'>
      <h1 className='text-5xl font-bold text-center mb-12'>Shop</h1>

      <div className='grid md:grid-cols-4 gap-8'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Shop