const blog = require('../models/blog')

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
    console.log(fave)
    return fave        
}

  
module.exports = {
    dummy,
    totalLikes,
    faveBlog
}