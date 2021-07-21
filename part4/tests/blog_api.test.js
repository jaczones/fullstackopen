const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeAll(async () => {
    await User.deleteMany({})
  
    const testUser = {
        username: 'test',
        name: 'test',
        password: 'test',
    }
    await api.post('/api/users').send(testUser)
})

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('returning saved notes tests', () => {
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
})

describe('posting notes to DB tests', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'itz',
            url: 'www.itz.com',
            likes: 0
        }
        const user = {
            username: 'test',
            password: 'test',
        }
        const login = await api.post('/api/login').send(user)
        const { token } = login.body
        await api
            .post('/api/blog')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).toContain(newBlog.title)
    })

    test('blog added with no likes defaults to zero', async () => {
        const newBlog = {
            title: 'nobody likes this blog',
            author: 'zac',
            url: 'www.itz.com',
        }
        const user = {
            username: 'test',
            password: 'test',
        }
        const login = await api.post('/api/login').send(user)
        const { token } = login.body
        await api
            .post('/api/blog')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const likes = blogsAtEnd.map((blog) => blog.likes)
        expect(likes).toContain(0)
    })

    test('blog with no title returns 400', async () => {
        const newBlog = {
            author: 'zac',
            url: 'www.itz.com',
        }
        const user = {
            username: 'test',
            password: 'test',
        }
        const login = await api.post('/api/login').send(user)
        const { token } = login.body
        await api
            .post('/api/blog')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog with no author returns 400', async () => {
        const newBlog = {
            title: 'zac',
            url: 'www.itz.com',
        }
        const user = {
            username: 'test',
            password: 'test',
        }
        const login = await api.post('/api/login').send(user)
        const { token } = login.body
        await api
            .post('/api/blog')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username less than 2 characters fails', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password less than 2 characters fails', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'mladsad',
            name: 'Matti Luukkainen',
            password: 'sa',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})