import mongoose from 'mongoose'

// Cache the connection across serverless function calls (important on Vercel)
let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to your Vercel Environment Variables.'
    )
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // These settings help with cold starts on Vercel serverless
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
