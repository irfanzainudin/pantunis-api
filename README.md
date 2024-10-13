# pantunis-api-hetzner

This is for testing with the Hetzner server. Should be the official backend replacing [pantunis-api](https://github.com/irfanzainudin/pantunis-api) using the name `pantunis-api` (might need to delete this repo after I get it working). For archive (and backup purposes), there is a Vercel version at [pantunis-api-vercel](https://github.com/irfanzainudin/pantunis-api-vercel).

## Building with Docker

This is only for production. For development, please refer to [package.json](https://github.com/irfanzainudin/pantunis-api/blob/main/package.json).

`docker build --platform linux/amd64,linux/arm64 -t irfanzainudin/pantunis-api:latest -f Dockerfile.prod .`

## Running with Docker

`docker run -dit -p 3001:3001 --name pantunis-api irfanzainudin/pantunis-api:latest`