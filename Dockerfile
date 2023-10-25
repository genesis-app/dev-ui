FROM node:18

RUN apt-get update && apt-get install -y \
  curl

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

CMD [ "yarn", "run", "prod" ]