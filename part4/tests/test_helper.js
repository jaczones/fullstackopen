const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'Test',
        author: 'Zac',
        url: 'www.test.com',
        likes: 4
    },
    {
        title: 'Test 2',
        author: 'Zac 2',
        url: 'www.test2.com',
        likes: 5
    },
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'Roald Dahl' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}