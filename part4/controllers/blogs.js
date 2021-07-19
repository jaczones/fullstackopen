const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})
  
blogRouter.post('/', async (request, response) => {
    const blog = await new Blog(request.body)
  
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter