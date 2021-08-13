import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { DB_URI } from '../config.js'

const connect = async () => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  if (process.env.NODE_ENV === 'test') {
    const mongoServer = await MongoMemoryServer.create()

    const uri = mongoServer.getUri()

    mongoose.connect(uri, mongooseOpts)

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        mongoose.connect(uri, mongooseOpts)
      }
    })

    mongoose.connection.once('open', () => {})
  } else {
    mongoose
      .connect(DB_URI, mongooseOpts)
      .then(() => console.log('Now connected to MongoDB!'))
      .catch((err) =>
        console.error(
          'Something went wrong when connecting to the db',
          err
        )
      )
  }
}

const close = () => {
  return mongoose.disconnect()
}

export default { connect, close }
