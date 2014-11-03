FROM dockerfile/nodejs

RUN npm install -g bower grunt-cli gulp http-server

COPY . /center-ui

RUN cd /center-ui; npm install && npm run build

WORKDIR /center-ui/dist

CMD ["http-server"]
