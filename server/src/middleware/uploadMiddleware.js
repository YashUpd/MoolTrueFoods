import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'
import multer from 'multer'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Use memory storage — we upload the buffer directly to Cloudinary
const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false)
    }
  },
})

// Upload buffer to Cloudinary and return result
export const uploadToCloudinary = (buffer, folder = 'mooltruefoods/products') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 800, height: 800, crop: 'fill', gravity: 'auto' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )

    // Convert buffer to readable stream and pipe to Cloudinary
    const readable = new Readable()
    readable._read = () => {}
    readable.push(buffer)
    readable.push(null)
    readable.pipe(stream)
  })
}

// Delete an image from Cloudinary by public ID
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null
  return cloudinary.uploader.destroy(publicId)
}

export default cloudinary
