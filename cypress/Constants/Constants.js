import {faker} from "@faker-js/faker";

const constants = {
    baseUrl: 'https://gorest.co.in/public/v2/users/',
    token: "e862fedf4a02ac25017cd15059bb0096fc8d59135a5cf22f2aaaead2492bb52e",
}

const authorization = {
    Authorization: 'Bearer ' + constants.token
}

const userInfo = {
    gender: 'male',
    name: faker.person.fullName({sex: 'male'}),
    email: faker.internet.email(),
    status: 'active',
}

const updatedUserInfo = {
    name: faker.person.fullName({sex: 'male'}),
    email: faker.internet.email(),
    status: 'active',
}

export {constants, userInfo, updatedUserInfo, authorization}
