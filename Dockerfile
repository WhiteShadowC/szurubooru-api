FROM node:18
WORKDIR /project
COPY . /project
RUN npm i
CMD npm run test