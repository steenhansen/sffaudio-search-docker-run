# https://hub.docker.com/repository/docker/steenhansen/sff-audio-search

# docker build -t steenhansen/sff-audio-search:base-nodejs .    --no-cache

# docker run                                    ^
#     --name=web__container                     ^
#     --env-file=sffaudio_search.env            ^
#     --network=neo4j__nodejs__net              ^
#     -e NEO4J_CONTAINER_NAME=neo4j__container  ^
#     -p 80:8080                                ^
#     steenhansen/sff-audio-search:base-nodejs   

# docker push steenhansen/sff-audio-search:base-nodejs

# docker exec -it web__container /bin/bash

FROM node:15.5.1-alpine3.10                   

# Setup Pacific Timezone, bash for cp 
 RUN apk update && \
     apk add --no-cache tzdata && \
     apk add --update bash 

WORKDIR /bash-scripts
COPY /bash-scripts/*.sh ./

ARG the_time_zone="PST8PDT"
#ARG the_time_zone="EST"
#ARG the_time_zone="UTC"

RUN sh "set-time-zone.sh" "$the_time_zone"      

WORKDIR /nodejs-base
COPY /nodejs-base/package*.json ./

## if execute 'do_modclean' also then image size 134MB, else 142MB
RUN npm ci && \
    npm run do_modclean  
    
## get nodeJs source    
COPY /nodejs-base/web-app/ /nodejs-base/web-app/  

CMD ["node", "/nodejs-base/web-app/node__webserver/boot-web.js"]

