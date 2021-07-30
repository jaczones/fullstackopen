describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Zachariah',
      username: 'Zachariah',
      password: 'zachariah'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'Zachariah', password: 'zachariah'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })
  it('front page can be opened', function() {
    cy.contains('log in')
    cy.get('#logout-button').click()
  })
  it('user can login', function () {
    cy.get('#logout-button').click()
    cy.contains('log in').click()
    cy.get('#username').type('Zachariah')
    cy.get('#password').type('zachariah')
    cy.get('#login-button').click()
    cy.get('#logout-button').click()
  })
  it('user cant login with incorrect creds', function () {
    cy.get('#logout-button').click()
    cy.contains('log in').click()
    cy.get('#username').type('Zac')
    cy.get('#password').type('zac')
    cy.contains('login').click()
    cy.get('.error').contains('Incorrect username or password, try again')
  })
  describe('when logged in', function() {
    it('a new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('lakeshow')
      cy.get('#author').type('russ')
      cy.contains('add').click()
      cy.contains('lakeshow')
      cy.contains('russ')
    })
    it('blog can be liked', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('lakeshow')
      cy.get('#author').type('russ')
      cy.contains('add').click()
      cy.get('#view-button').click()
      cy.get('#likes-button').click()
      cy.contains('1')
    })
    it('blog can be deleted', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('lakeshow')
      cy.get('#author').type('russ')
      cy.contains('add').click()
      cy.get('#view-button').click()
      cy.get('#remove').click()
      cy.contains('successfully deleted')
    })
  })
  describe('add more blogs', function() {
    beforeEach(function() {
      cy.create({ author: 'Kobe', title: 'Rings', url: 'http://www.five.com' })
      cy.create({ author: 'Michael', title: 'Rings', url: 'http://www.six.com' })
      cy.create({ author: 'Lebron', title: 'Rings', url: 'http://www.four.com' })

      cy.contains('Kobe').parent().as('blog1')
      cy.contains('Michael').parent().as('blog2')
      cy.contains('Lebron').parent().as('blog3')
    })
    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)


      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('5')
        cy.wrap(blogs[1]).contains('4')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})