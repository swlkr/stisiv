# stisiV API

### Getting started

```bash
git clone git@github.com:swlkr/stisiv-api.git
cd stisiv-api
npm install
psql -c "create database stisiv_development;"
touch .env && echo "DATABASE_URL=postgres://postgres:@localhost:5432/stisiv_development" >> .env
./node_modules/.bin/db-migrate up
npm run dev
```
