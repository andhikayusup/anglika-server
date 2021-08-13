import dotenv from 'dotenv'

dotenv.config()

export const DB_URI = process.env.DB_URI || '[REDACTED]'
export const SECRET_KEY = process.env.SECRET_KEY || '[REDACTED]'
export const PORT = process.env.PORT || 5000
