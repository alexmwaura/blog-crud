## BLOG CRUD APP
This a simple website with CRUD capabilities. It is built using NestJS and ReactJS

---

https://blog-crud-khaki.vercel.app/

---

![](https://i.imgur.com/T0xjY3D.png)


### User Story

- User is able to post a new blog with some title and description
- User is able to read the blog
- User is able to edit and update the blog
- User is able to delete blog
- Users are able to comment on blog

## Get Started

```bash
git clone git@github.com:alexmwaura/blog-crud.git
```

## Backend services

Navigate to `/api`
```
cd api && npm install
```
Add postgresql database url as `DATABASE_URL` to `.env` file in `/api` directory
```
DATABASE_URL=postgresql_url
```
To run the application use
```
npm run start:dev
```

## Frontend/client
```
cd view && npm install
```
Add API Endpoint as `axios.default.baseUrl` to `view/src/App.js`

```javascript

axios.default.baseUrl = 'http://localhost:8080'
class App extends Component{
    ....
}
```

```bash
npm run start
```
Open app at `http://localhost:3000`


