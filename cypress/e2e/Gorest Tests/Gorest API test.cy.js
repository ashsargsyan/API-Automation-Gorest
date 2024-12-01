import {constants, userInfo, updatedUserInfo, authorization} from "../../Constants/Constants";

describe('User Create, Read, Update, Delete operations', () => {
  let id;

  it('Should Create User', () => {
    cy.request({
      method: 'POST',
      url: constants.baseUrl,
      headers: authorization,
      body: userInfo,
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name').and.eq(userInfo.name)
      expect(response.body).to.have.property('gender').and.eq(userInfo.gender)
      expect(response.body).to.have.property('email').and.eq(userInfo.email)
      expect(response.body).to.have.property('status').and.eq(userInfo.status)
      expect(response.body).to.have.property('id')
      id = response.body.id
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${constants.baseUrl}${id}`,
        headers: authorization,
      })
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(userInfo.name)
      expect(response.body.gender).to.eq(userInfo.gender)
      expect(response.body.email).to.eq(userInfo.email)
      expect(response.body.status).to.eq(userInfo.status)
    })
  })

  it('Should Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${constants.baseUrl}${id}`,
      headers: authorization,
      body: updatedUserInfo,
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(updatedUserInfo.name)
      expect(response.body.email).to.eq(updatedUserInfo.email)
      expect(response.body.gender).to.eq(userInfo.gender)
      expect(response.body.status).to.eq(updatedUserInfo.status)
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${constants.baseUrl}${id}`,
        headers: authorization,
      })
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(id)
      expect(response.body.name).to.eq(updatedUserInfo.name)
      expect(response.body.gender).to.eq(userInfo.gender)
      expect(response.body.email).to.eq(updatedUserInfo.email)
      expect(response.body.status).to.eq(updatedUserInfo.status)
    })
  })

  it('Should Delete User ', () => {
    cy.request({
      method: 'DELETE',
      url: `${constants.baseUrl}${id}`,
      headers: authorization,
    }).then(response => {
      expect(response.status).to.eq(204)
      expect(response.body).to.be.empty;
    }).then(() => {
      cy.request({
        method: 'GET',
        url: `${constants.baseUrl}${id}`,
        headers: authorization,
        failOnStatusCode: false,
      })
    }).then(response => {
      expect(response.status).to.eq(404)
      expect(response.body.message).to.eq('Resource not found')
    })
  })
})
