const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blog')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is called id', async () => {
    const response = await api.get('/api/blog')
    expect(response.body[0].id).toBeDefined()
})
  
test('a specific note is within the returned blogs', async () => {
    const response = await api.get('/api/blog')
  
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Test'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'itz',
        url: 'www.itz.com',
        likes: 0
    }
  
    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('blog added with no likes defaults to zero', async () => {
    const newBlog = {
        title: 'nobody likes this blog',
        author: 'zac',
        url: 'www.itz.com',
    }
  
    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map((blog) => blog.likes)
    expect(likes).toContain(0)
})


afterAll(() => {
    mongoose.connection.close()
})