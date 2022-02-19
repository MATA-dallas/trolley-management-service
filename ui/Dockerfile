# build environment
FROM node:14
WORKDIR /app
COPY app/package.json .
COPY app/package-lock.json .
COPY app/tsconfig.json .
RUN npm install
COPY app .
RUN npm run build

RUN mkdir dashboard
RUN mv ./build ./dashboard
COPY tracker ./tracker

# production environment
FROM nginx

COPY --from=0 /app/dashboard/build /usr/share/nginx/html/dashboard
COPY --from=0 /app/tracker /usr/share/nginx/html/tracker
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]