import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const stored = localStorage.getItem('mooltrue_wishlist')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error)
      return []
    }
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mooltrue_wishlist', JSON.stringify(wishlistItems))
    } catch (error) {
      console.error('Failed to save wishlist to localStorage', error)
    }
  }, [wishlistItems])

  // Toggle a product in/out of the wishlist
  const toggleWishlist = (productId) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      }
      return [...prev, productId]
    })
  }

  // Check if a product is wishlisted
  const isWishlisted = (productId) => {
    return wishlistItems.includes(productId)
  }

  // Remove a single item
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(id => id !== productId))
  }

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([])
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
