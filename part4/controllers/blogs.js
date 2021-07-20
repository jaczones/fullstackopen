const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})
  
blogRouter.post('/', async (request, response, next) => {
    const blog = await new Blog(request.body)
    const title = request.body.title
    const author = request.body.author
    if (!title || !author) {
        return response.status(400).json({
            error: 'Title or Author missing'
        })
    }
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
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