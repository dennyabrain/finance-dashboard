FROM node:15.7.0-alpine3.12 
WORKDIR /app

RUN apk add vim curl sqlite python3 py3-pip
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# ENV PATH="/root/.cargo/bin:${PATH}"

COPY package.json /app/package.json
RUN npm install
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]