import {faker} from "@faker-js/faker";

describe('User CRUD operations', () => {
  it('Should Create, Read, Update and Delete User', () => {
    let id;
    const token = "e862fedf4a02ac25017cd15059bb0096fc8d59135a5cf22f2aaaead2492bb52e";
    const baseUrl = 'https://gorest.co.in/public/v2/users/';
    const authorization = {Authorization: 'Bearer ' + token};
    const gender = faker.person.sexType();
    const name = faker.person.fullName();
    const email = faker.internet.email()
    const status = 'active';
    const updatedName = faker.person.fullName();
    const updatedEmail = faker.internet.email();
    const userInfo = {
      "name": name,
      "gender": gender,
      "email": email,
      "status": status
    }
    const updatedUserInfo = {
      "name": updatedName,
      "email": updatedEmail,
      "status": status
    }

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: authorization,
      body: userInfo,
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name').and.eq(name)
      expect(response.body).to.have.property('gender').and.eq(gender)
      expect(response.body).to.have.property('email').and.eq(email)
      expect(response.body).to.have.property('status').and.eq(status)
      expect(response.body).to.have.property('id')
      id = response.body.id
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}${id}`,
        headers: authorization,
      })
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(name)
      expect(response.body.gender).to.eq(gender)
      expect(response.body.email).to.eq(email)
      expect(response.body.status).to.eq(status)
    }).then(() => {
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}${id}`,
        headers: authorization,
        body: updatedUserInfo,
      })
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(updatedName)
      expect(response.body.email).to.eq(updatedEmail)
      expect(response.body.gender).to.eq(gender)
      expect(response.body.status).to.eq(status)
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}${id}`,
        headers: authorization,
      })
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(updatedName)
      expect(response.body.gender).to.eq(gender)
      expect(response.body.email).to.eq(updatedEmail)
      expect(response.body.status).to.eq(status)
    }).then(() => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}${id}`,
        headers: authorization,
      })
    }).then(response => {
      expect(response.status).to.eq(204)
      expect(response.body).to.be.empty;
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}${id}`,
        headers: authorization,
        failOnStatusCode: false,
      })
    }).then(response => {
      expect(response.status).to.eq(404)
      expect(response.body.message).to.eq('Resource not found')
    })
  })
})
