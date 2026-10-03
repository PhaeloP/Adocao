FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia os arquivos dos projetos para restaurar dependências
COPY ["Adocao.API/Adocao.API.csproj", "Adocao.API/"]
COPY ["Adocao.Application/Adocao.Application.csproj", "Adocao.Application/"]
COPY ["Adocao.Domain/Adocao.Domain.csproj", "Adocao.Domain/"]
COPY ["Adocao.Infra/Adocao.Infra.csproj", "Adocao.Infra/"]

RUN dotnet restore "Adocao.API/Adocao.API.csproj"

# Copia todo o restante e faz o build
COPY . .
WORKDIR "/src/Adocao.API"
RUN dotnet build "Adocao.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Adocao.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Estágio final para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Adocao.API.dll"]