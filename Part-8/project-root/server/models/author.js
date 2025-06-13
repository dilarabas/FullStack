import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, unique: true },
  born: Number
})

export default mongoose.model('Author', authorSchema)
