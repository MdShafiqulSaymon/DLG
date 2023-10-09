const request = require('supertest');
import appRouter from "../routes";
import supertest from 'supertest'
import createServer from "../utills/server";
import { Response } from "express";
const app=createServer()
describe('User API', () => {
  describe.skip('Create User',()=>{
    it('should register a new user', async () => {
      const newUser = {
        username: 'bbbb',
        email: 'bbbb@example.com',
        password: 'password123',
      };
      const response = await request(app).post('/api/register').send(newUser);
      console.log(response);
      expect(response.status).toBe(201)
    });
  })



  describe('User Already',()=>{
    it('Exists', async () => {
      const newUser = {
        username: 'bbbb',
        email: 'bbbb@example.com',
        password: 'password123',
      };
  
      const response = await request(app).post('/api/register').send(newUser);
      expect(response.status).toBe(500);
    });
  })
  describe('Get All',()=>{
    it(' Users',async()=>{
      const userId='10';
      const {body,status}=await request(app).get('/api/users');
      expect(status).toBe(200)
    })
  })
  describe.skip('Delete User',()=>{
    it('Delete A User',async()=>{
      const userId='10';
      const {body,status}=await request(app).delete(`/api/${userId}`);
      expect(status).toBe(200)
    })
  })
  describe('Update a User',()=>{
    it('Update an Specific User with User Id',async()=>{
      const userId='11';
      const updatedData={
        password:'123456789'
      }
      const {body,status}=await request(app).put(`/api/${userId}`).send(updatedData);
      expect(status).toBe(200)
    })
  })
  describe('Complete User',()=>{
    it('User Profile with User Id',async()=>{
      const userId='11';
      const CompleteUserProfile={
        firstName:'SAYMON',
        lastName:'HASAN'
      }
      const {body,status}=await request(app).put(`/api/${userId}`).send(CompleteUserProfile);
      expect(status).toBe(200)
    })
  })
});
