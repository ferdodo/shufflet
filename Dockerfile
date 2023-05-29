FROM node
WORKDIR /shufflet
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
RUN npm prune --production

FROM nginx
COPY --from=0 /shufflet/public /usr/share/nginx/html
