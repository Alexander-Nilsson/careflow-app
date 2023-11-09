FROM node:latest
WORKDIR /app

COPY careflow-app/package.json /app/
COPY careflow-app/package-lock.json /app/

RUN npm install
RUN npm install typescript -g

COPY careflow-app/public/ /app/public
COPY . /app
COPY careflow-app/src/ /app/src
# RUN npx tsc /app/src/index.tsx 

EXPOSE 3000
CMD npm start