const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1 })
    response.json(blogs)
})

/* const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
} */
  
blogRouter.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    const title = request.body.title
    const author = request.body.author
    if (!title || !author) {
        return response.status(400).json({
            error: 'Title or Author missing'
        })
    }
    const blog = new Blog({
        title: title,
        author: author,
        url: request.body.url,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.deleteOne({ _id: blogId })
        response.sendStatus(204)
    } else {
        response.status(403).json({ error: 'forbidden: invalid user' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    try {
        const { title, author, url, likes } = request.body
        const blog = {
            title,
            author,
            url,
            likes
        }
        const updateEntry = await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true
        })
        response.json(updateEntry)
    } catch (error) {
        return(error)
    }
})

module.exports = blogRouter