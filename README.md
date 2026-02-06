# socialite

## How to run
- By default `docker compose up` spins up dev environment
  - If new dependencies are added run `docker compose up --build`
- For production build use `docker compose -f compose.yaml -f compose.prod.yaml up -d`
