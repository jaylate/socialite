# Socialite

## How to run
- By default `docker compose up` spins up dev environment
  - If new dependencies are added run `docker compose up --build`
- For development purposes `SOCIALITE_BASE_URL` environment variable is set to `http://gateway` but when using in production it should be set to the URL where the app is going to be hosted
- For production build use `docker compose -f compose.yaml -f compose.prod.yaml up -d`
