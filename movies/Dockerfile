FROM node:dubnium-buster

RUN  mkdir /opt/app

WORKDIR /opt/app

COPY ./package.json /opt/app/package.json
COPY ./package-lock.json /opt/app/package-lock.json
COPY ./tsconfig.json /opt/app/tsconfig.json
COPY ./src /opt/app/src

RUN npm i

CMD [ "npm", "run", "start" ]
