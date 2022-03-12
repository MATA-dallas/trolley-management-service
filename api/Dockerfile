FROM node:14
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY knexfile.js .
COPY run-app.sh .
RUN npm install
COPY ./src ./src
COPY ./migrations ./migrations
RUN npm run build

EXPOSE 3000

CMD [ "sh","run-app.sh" ]