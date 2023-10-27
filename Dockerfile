FROM node:latest

# create & set working directory
RUN mkdir -p /usr/app/
WORKDIR /usr/app/

# copy source files
COPY . /usr/app/
COPY package*.json /usr/app/
COPY global.d.ts /usr/app/
COPY yarn.lock /usr/app/

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]