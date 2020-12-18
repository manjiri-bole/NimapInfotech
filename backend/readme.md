## Skeleton for Node.js applications written in TypeScript

## Import DB script first from ./src/DBScript/dump.sql file

## Install all NPM dependencies
npm install
npm i bcrypt

### Compile Typescript
Steps: 

1. Press ctrl+shift+p
2. Choose Tasks: Run Task
3. Choose tsc: watch tsconfig.json
4. Restart Node server throw command line: npm run dev


### Development
// Run application
// Kill port if may exist

sudo kill $(sudo lsof -t -i:8090)

### Use below environment

### Development environment
npm run dev

### Staging environment
npm run staging

### Production environment
npm run prod

### Running TDC tests

npm run test
-----------------------------------------

### Linting
npm run lint

### Building a container

docker build . 
