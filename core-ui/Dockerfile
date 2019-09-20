# This Dockerfile must be execute with higher context, because firstly we have to create react components lib with local changes.
# If you want to build image without local changes of react components, delete 16 line of code.

# copying .env in 13 line is a temporary solution for issue with babel-loader package in react-scripts 

FROM node:10.11.0-alpine as ui-generator

WORKDIR /app

# Copy licenses
COPY licenses/ /app/licenses/

# Install global dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache curl

# Install root and app dependencies
COPY ./temp /app
RUN npm run bootstrap:prod

COPY package.json package-lock.json /app/core-ui/
RUN cd /app/core-ui && npm install --no-optional --unsafe-perm

# Copy sources
COPY src /app/core-ui/src
COPY public /app/core-ui/public

# Set env variables 
ENV PRODUCTION true
ENV CI true

# Test & Build
RUN cd /app/core-ui && npm run build

FROM nginx:1.14.0-alpine
LABEL source git@github.com:kyma-project/console.git

COPY --from=ui-generator /app/core-ui/build var/public
COPY --from=ui-generator /app/licenses/ /app/licenses/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]