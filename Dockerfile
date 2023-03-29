# Production stage
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

ENV FLAGS_API=https://flagcdn.com/en/codes.json
ENV NEXT_PUBLIC_GROWTHX_API=https://eo3oi83n1j77wgp.m.pipedream.net

RUN yarn build

CMD ["yarn", "start"]
