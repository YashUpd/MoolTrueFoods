import { useParams } from 'react-router-dom'
import products from '../data/products'

function ProductDetails() {
  const { id } = useParams()

  const product = products.find(item => item.id === parseInt(id))

  return (
    <section className='px-8 py-20'>
      <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full rounded-2xl'
        />

        <div>
          <h1 className='text-5xl font-bold mb-6'>{product.name}</h1>

          <p className='text-2xl font-semibold mb-4'>₹{product.price}</p>

          <p className='text-gray-600 leading-8 mb-8'>
            {product.description}
          </p>

          <button className='bg-black text-white px-8 py-4 rounded-xl'>
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails