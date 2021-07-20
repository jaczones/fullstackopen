const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1 })
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
  
blogRouter.post('/', async (request, response, next) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
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
    try {
        const checkBlog = await Blog.findById(request.params.id)
        if (!checkBlog) {
            return response.status.blogRouter(400).json({
                error: 'There is no blog correlated with this ID'
            })
        }
        await Blog.findByIdAndRemove(request.params.id)
        response.json({ success: true })
    } catch (error) {
        return (error)
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