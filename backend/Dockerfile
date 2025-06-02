FROM node:lts-alpine
USER node
WORKDIR /app
COPY package.json yarn.lock  ./
RUN yarn install
COPY . .
EXPOSE 5000
ENTRYPOINT [ "yarn" ]
CMD [ "dev" ]
