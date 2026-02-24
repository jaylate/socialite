# Socialite

## How to run
- Specify desired values in `.env` by copying `.env.example` first
- By default `docker compose up` spins up dev environment
  - If new dependencies are added run `docker compose up --build`
- For development purposes `SOCIALITE_BASE_URL` environment variable is set to `http://gateway` but when using in production it should be set to the URL where the app is going to be hosted
- For production build use `docker compose -f compose.yaml -f compose.prod.yaml up -d`

## Development Setup

### Install dependencies
```bash
cd frontend && npm install
```

### Pre-commit Hooks
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Test if it works (Optional)
pre-commit run --all-files
```
