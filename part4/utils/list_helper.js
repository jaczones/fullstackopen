const blog = require('../models/blog')
const _ = require('lodash')

const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    return blogs
        ? blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
        : blogs.length === 1
            ? blogs[0].likes
            : 0
}

const faveBlog = (blogs) => {
    const fave = blogs.length > 1
        ? blogs.reduce((faveBlog, blog) => blog.likes > faveBlog.likes ? blog : faveBlog)
        : blogs.length === 1
            ? blogs[0]
            : null
    return fave        
}

const mostBlogs = (blogs) => {
    if (!blogs) return null
    if (blogs === 1 ) return { author: blogs[0].author, blogs: blogs[0].likes }
  
    return _.chain(blogs)
        .countBy('author')
        .map((blogs, author) => ({ author, blogs }))
        .maxBy('blogs')
        .value()
}
  
const mostLikes = (blogs) => {
    if (!blogs) return null
    if (blogs === 1) return { author: blogs[0].author, likes: blogs[0].likes }
  
    return _.chain(blogs)
        .groupBy('author')
        .mapValues(blogs => blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0))
        .map((likes, author) => ({ author, likes }))
        .maxBy('likes')
        .value()
}

  
module.exports = {
    dummy,
    totalLikes,
    faveBlog,
    mostBlogs,
    mostLikes
}