FROM node:16

USER node

RUN test -d /home/node/dsw-trello-back || mkdir -p /home/node/dsw-trello-back

WORKDIR /home/node/dsw-trello-back

COPY --chown=node:node  package*.json ./

RUN yarn install

COPY --chown=node:node . /home/node/dsw-trello-back

EXPOSE 4005

# RUN npx prisma generate

CMD ["yarn", "dev"]