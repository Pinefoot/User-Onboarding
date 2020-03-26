// //Set up tests that will...

//  Get the Name input and type a name in it.
//  Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
//  Get the Email input and type an email address in it
//  Get the password input and type a password in it
//  Set up a test that will check to see if a user can check the terms of service box
//  Check to see if a user can submit the form data
//  Check for form validation if an input is left empty

describe('Testing form inputs', function(){
    beforeEach(function(){
        cy.visit('http://localhost:3000');
    });
    it('adding text to inputs and submiting form', function(){
        cy.get('input[name="name"]')
        .type('James').should('have.value','James');

        cy.get('input[name="email"]')
        .type('Email@email.com').should('have.value', 'Email@email.com');

        cy.get('input[name="password"]')
        .type('PasswordMagoo').should('have.value', 'PasswordMagoo');

        cy.get('[type="checkbox"]')
        .check().should('be.checked');

        cy.get('.button')
        .click().should('be.clicked');




    });



})