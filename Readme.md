# BLOG CRUD APP

## This a simple website with CRUD capabilities. It is built using NestJS and ReactJS
---

```bash
git clone git@github.com:alexmwaura/blog-crud.git
```

## Start Backend

### Navigate to `/api`
```
cd api && npm install
```
### Add postgresql database url as `DATABASE_URL` to `.env` file in `/api` directory
```
DATABASE_URL=postgresql_url
```
### To run the application use
```
npm run start:dev
```

## Start Frontend
```
cd view && npm install
```
### Add API Endpoint as `axios.default.baseUrl` to `view/src/App.js`

```javascript

axios.default.baseUrl = 'http://localhost:8080'
class App extends Component{
    ....
}
```

```bash
npm run start
```
### Open app at `http://localhost:3000`


