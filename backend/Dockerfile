# Base
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY *.csproj ./
RUN dotnet restore
COPY . .

# Publish
FROM build AS publish
RUN dotnet publish -c Release -o /app/out --no-restore

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine
WORKDIR /app
COPY --from=publish /app/out .
ENTRYPOINT ["dotnet", "Socialite.dll"]
