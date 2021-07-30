describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Zachariah',
            username: 'Zachariah',
            password: 'zachariah'
          }
        cy.request('POST', 'http://localhost:3003/api/users', user) 
        cy.visit('http://localhost:3000')
      })
    it('front page can be opened', function() {
      cy.contains('log in')
    })

    it('login form can be opened', function() {
        cy.contains('log in').click()
    })
    it('user can login', function () {
        cy.contains('log in').click()
        cy.get('#username').type('Zachariah')
        cy.get('#password').type('zachariah')
        cy.get('#login-button').click()
        cy.get('#logout-button').click()
      })
    it('user cant login with incorrect creds', function () {
        cy.contains('log in').click()
        cy.get('#username').type('Zac')
        cy.get('#password').type('zac')
      })
      
describe('when logged in', function() {
    beforeEach(function() {
        cy.contains('log in').click()
        cy.get('input:first').type('Zachariah')
        cy.get('input:last').type('zachariah')
        cy.get('#login-button').click()
})

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
        cy.contains('blogs')
    })
    })
})
