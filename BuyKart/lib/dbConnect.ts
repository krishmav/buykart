import mongoose from "mongoose"

let cached = (global as any).mongoose as {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is missing. Add it to your environment variables.")

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
