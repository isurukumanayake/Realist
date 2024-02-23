FROM node:alpine as build

# Declare build time environment variables
ARG REACT_APP_API
ARG REACT_APP_GOOGLE_API_KEY

# Set default values for environment variables
ENV REACT_APP_API=$REACT_APP_API
ENV REACT_APP_GOOGLE_API_KEY=$REACT_APP_GOOGLE_API_KEY

# Build App
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]