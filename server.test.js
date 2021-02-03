const app = require('./server'); // Link to your server file
const request = require('supertest');
const airports = require('./airports.json');

describe('GET /airports', function () {
  it('responds with json list of airports', function (done) {
    request(app)
      .get('/airports')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body.length).toBeGreaterThan(28000);
      })
      .expect(200, done);
  });
  it('can fetch a single airport based on ICAO', function (done) {
    request(app)
      .get('/airports/00AK')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].icao).toBe('00AK');
      })
      .expect(200, done);
  });
  it('can fetch a single airport based on ICAO regardless of case', function (done) {
    request(app)
      .get('/airports/00ak')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].icao).toBe('00AK');
      })
      .expect(200, done);
  });
  it('returns 400 status if ICAO cannot be found', function (done) {
    request(app)
      .get('/airports/12345')
      .set('Accept', 'text/html')
      .expect((response) => {
        expect(response.text).toBe('No airport match of icao: 12345');
      })
      .expect(400, done);
  });
});

describe('POST /airports', function () {
  it('adds posted airport object to the array', function (done) {
    const testAirport = {
      icao: '12345',
      iata: 'test',
      name: 'test',
      city: 'test',
      state: 'Alaska',
      country: 'US',
      elevation: 450,
      lat: 59.94919968,
      lon: -151.695999146,
      tz: 'America/Anchorage'
    };
    request(app)
      .post('/airports')
      .send(testAirport)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body === testAirport);
      })
      .expect(201, done);
  });
  it('cannot post non airport object', function (done) {
    request(app).post('/airports').send('test').expect(400, done);
  });
});
