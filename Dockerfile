FROM node:18
WORKDIR /project
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY . /project
CMD yarn run --silent test