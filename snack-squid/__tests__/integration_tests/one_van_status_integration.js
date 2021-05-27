/*
Test Suite for testing set van status functionality
*/
const request = require('supertest');

const mongoose = require('mongoose')
const Van = require('../../model/van')

const app = require('../../app');

describe('Integration test: set van status', () => {

    let agent = request.agent(app);

    let cookie = null;

    beforeAll(() => agent
        // send a POST request to login
        .post('/vendor')
        // IMPORTANT: without the content type setting your request
        // will be ignored by express
        .set('Content-Type', 'application/x-www-form-urlencoded')
        // send the username and password
        .send({
            vanName: 'Alvy',
            password: '123123',
        })
        // when we get back the cookie, store it in a variable.
        // If the API server returns a token store it here instead
        // of the cookie
        .then((res) => {
            cookie = res
                .headers['set-cookie'][0]
                .split(',')
                .map(item => item.split(';')[0])
                .join(';')
        })
    );

    test("check if van can open", async() => {
        let location = { location: "new location" }
        const response = await agent.post('/vendor/open-for-business/open').send(location);
        expect(response.statusCode).toBe(200);
    })

    test("check if van can close", async() => {
        const response = await agent
            .get('/vendor/profile/close');
        expect(response.statusCode).toBe(200);
    })
})