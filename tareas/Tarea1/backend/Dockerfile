# Iniciar imagen basada en Debian
FROM golang:1.16 as builder

# Crear un directorio para la aplicacion
WORKDIR /app

# Copiar los archivos locales del paquete al espacio de trabajo del contenedor
ADD . /app

# Contruir la aplicacion Go como un binario estatico
RUN CGO_ENABLED=0 go build -o /main .

# Usar una construccion multi-etapa para crear una imagen de produccion
FROM scratch

# Copiar el ejecutable estatico
COPY --from=builder /main /main

# Ejecutar el binario
ENTRYPOINT ["/main"]
