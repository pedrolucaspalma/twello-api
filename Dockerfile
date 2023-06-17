FROM node:18

USER node

RUN test -d /home/node/twello-api || mkdir -p /home/node/twello-api

WORKDIR /home/node/twello-api 

COPY --chown=node:node  package*.json ./

RUN npm install

COPY --chown=node:node . /home/node/twello-api 

EXPOSE 4005

CMD ["npm", "run", "dev"]