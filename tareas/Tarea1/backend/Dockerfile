# Utilizamos la imagen base oficial de Go
FROM golang:1.16

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el código fuente
COPY . .

# Compilamos la aplicación
RUN go build -o main .

# Exponemos el puerto 8080
EXPOSE 8080

# Ejecutamos la aplicación
CMD ["./main"]
