# Production stage
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn run install:prod

COPY . .

ARG FLAGS_API=https://flagcdn.com/en/codes.json
ENV FLAGS_API=${FLAGS_API}

ARG NEXT_PUBLIC_GROWTHX_API=https://flagcdn.com/en/codes.json
ENV NEXT_PUBLIC_GROWTHX_API=${NEXT_PUBLIC_GROWTHX_API}

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
