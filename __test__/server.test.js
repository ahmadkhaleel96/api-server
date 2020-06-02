const {server} = require('../lib/server.js');
const supertest = require('supertest');
const mochServer = supertest(server);

describe('404 middleware module',()=>{
  it('it should response with status 200',()=>{
    return mochServer.get('/api/v1/products/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.get('/api/v1/products').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.put('/api/v1/products/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.post('/api/v1/products').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.delete('/api/v1/products/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.get('/api/v1/categories/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.get('/api/v1/categories').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.put('/api/v1/categories/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.post('/api/v1/categories').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
  it('it should response with status 200',()=>{
    return mochServer.delete('/api/v1/categories/1').then((result)=>{
      expect(result.status).toBe(200);
    });
  });
}); 