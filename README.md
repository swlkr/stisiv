# visics API

### Getting started

```bash
git clone git@github.com:swlkr/visics-api.git
cd visics-api
npm install
psql -c "create database visics_development;"
touch .env && echo "DATABASE_URL=postgres://postgres:@localhost:5432/visics_development" >> .env
./node_modules/.bin/db-migrate up
npm run dev
```
