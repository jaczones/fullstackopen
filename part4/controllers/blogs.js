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

module.exports = blogRouter