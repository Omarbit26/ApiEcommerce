import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/modules/users/users.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockCreaterUser:CreateUserDto =  {
    "email": "om2aralaiga40@gmail.com",
    "name": "Jane xxxx",
    "password": "1234aA#abc",
    "confirmPassword": "1234aA#abc",
    "address": "456 Elm Stxxx",
    "phone": "123456789",
    "country": "Canadaxxxx",
    "city":"LIma ciudad"
  }

  let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjU3ODQ0MTYzLCJpYXQiOjE2NTc4NDA0NjN9.eyJyb2xlcyI6WyJhZG1pbiIsIkJ1c2luZXNzIl19.z73E2z40_dI6_55_4s04002-7452-3344-5566-77889900"

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });


  it('GET/ ', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({message:'Hello World!'});
  });

  
  it('(GET) /users si no se envia el token devuelve error 401', async() => {
    const req = await request(app.getHttpServer()).get('/users');
    expect(req.status).toBe(401)
    expect(req.body).toBeInstanceOf(Object)
    
  });

  it('(GET) /users si se envia token invalido devuelve error 401', async() => {
    const req = await request(app.getHttpServer())
    .get('/users')
    .set('authorization', `Bearer: ${mockToken}`).send();

    expect(req.status).toBe(401)
    expect(req.body).toBeInstanceOf(Object)
    
  });

  it('(GET) /orders si no se envia el token devuelve error 404', async() => {
    const req = await request(app.getHttpServer()).get('/orders');
    expect(req.status).toBe(404)
    expect(req.body).toBeInstanceOf(Object)
    
  });


  it('(GET) /orders  si se envia token invalido devuelve error 401', async()=>{
    const req = await request(app.getHttpServer())
    .get('/orders')
    .set('authorization', `Bearer: ${mockToken}`).send();

    expect(req.status).toBe(404)
    expect(req.body).toBeInstanceOf(Object)
  })

});
