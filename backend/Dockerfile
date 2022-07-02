FROM node:15.7.0-alpine3.12 
WORKDIR /app

RUN apk add vim curl

COPY package.json /app/package.json
RUN npm install
COPY . .

CMD ["node", "server.js"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]