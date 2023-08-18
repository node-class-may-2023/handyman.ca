# Starting New Project

1. Initialize npm package

```bash
npm init -y
```

2. Initialize git repository, link to github, and push first commit

```bash
git init
git remote add origin <url>
git add .
git commit -m 'initialize repository'
git push -u origin main # subsequent pushes will be with just git push
```

3. Add `.gitignore` for `node_modules` and `.env`
4. Create `.env.example`
5. Install required packages as per `package.json`
