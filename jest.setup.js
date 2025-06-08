require('@testing-library/jest-dom');
const { default: fetch, Request, Response, Headers } = require('node-fetch');
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
// Mock fetch globally 