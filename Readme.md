# Starting New Project

- Initialize npm package

```ps
npm init -y
```

- Initialize git repository, link to github, and push first commit

```bash
git init
git remote add origin <url>
git add .
git commit -m 'initialize repository'
git push -u origin main # subsequent pushes will be with just git push
```

- Add `.gitignore` for `node_modules` and `.env`
- Create `.env.example`
- Install required packages as per `package.json`
- Create required scripts
  - start command
- Create folder structure
  - `controllers`
  - `db`
  - `middleware`
  - `models`
  - `public`
  - `routes`
  - `utils`
  - `validators`
  - `view`
- Create the express server
- Add middleware(s) and setup view engine
- Add the 404 route
- Setup mongoose connection logic
- Update the server to establish a connection, then start server
- Create the DB models
- Create the auth middleware
- Create the login, register, and logout routes
