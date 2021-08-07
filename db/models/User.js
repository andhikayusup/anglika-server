import mongoose from 'mongoose'

const { model, Schema } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  active: Boolean,
  createdAt: String
})

export default model('User', userSchema)
