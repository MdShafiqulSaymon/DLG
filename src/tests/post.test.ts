const request = require('supertest');
import createServer from "../utills/server";
const app=createServer()
describe('Post API Testing',()=>{
    describe('Create A New Post',()=>{
        it('For a User',async()=>{
            const userId='11';
            const payolad={
                title: 'Testing',
                content: 'API Testing',
            }
            const {body,status}=await request(app).post(`/api/createPost/${userId}`).send(payolad);
            expect(status).toBe(200);
        })
    })
    describe('GetAll Post',()=>{
        it('OF a User',async()=>{
            const userId='11';
            const {body,status}=await request(app).get(`/api/getAllPosts/${userId}`)
            expect(status).toBe(200);
        })
    })
    describe('Delete a Post',()=>{
        it('OF a User',async()=>{
            const userId='11';
            const postId='8'
            const {body,status}=await request(app).delete(`/api/deletePost/${userId}/${postId}`)
            expect(status).toBe(200);
        })
    })
    describe('Update a Post',()=>{
        it('OF a User',async()=>{
            const userId='11';
            const postId='3';
            const updateData={
                title: 'Update Testing',
                content: 'Update API Testing',
            }
            const {body,status}=await request(app).put(`/api/updatePost/${userId}/${postId}`).send(updateData)
            expect(status).toBe(200);
        })
    })
})