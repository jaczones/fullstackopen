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
  
module.exports = {
    dummy,
    totalLikes,
}