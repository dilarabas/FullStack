require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

jest.setTimeout(20000)  // 20 saniye timeout

beforeAll(async () => {
  const mongoUrl = process.env.MONGODB_TEST_URI || 'mongodb://localhost/bloglist_test'
  await mongoose.connect(mongoUrl)
})


const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author1',
    url: 'http://first.blog',
    likes: 2,
  },
  {
    title: 'Second blog',
    author: 'Author2',
    url: 'http://second.blog',
    likes: 3,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json and correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('dummy test', () => {
  expect(true).toBe(true)
})
