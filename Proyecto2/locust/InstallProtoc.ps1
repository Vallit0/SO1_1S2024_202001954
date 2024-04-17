# Define la URL de descarga y el directorio de instalación
$protocVersion = "21.7"
$protocUrl = "https://github.com/protocolbuffers/protobuf/releases/download/v$protocVersion/protoc-$protocVersion-win64.zip"
$installDir = "C:\Program Files\Protoc"

# Crear el directorio si no existe
if (-Not (Test-Path $installDir)) {
    New-Item -ItemType Directory -Force -Path $installDir
}

# Ruta del archivo ZIP temporal
$zipFile = "$installDir\protoc.zip"

# Descargar el archivo ZIP
Invoke-WebRequest -Uri $protocUrl -OutFile $zipFile

# Extraer el archivo ZIP
Expand-Archive -LiteralPath $zipFile -DestinationPath $installDir -Force

# Limpiar el archivo ZIP
Remove-Item -Path $zipFile

# Agregar el directorio al PATH, solo si no está ya agregado
$binPath = "$installDir\bin"
if (-Not [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::Machine).Contains($binPath)) {
    [System.Environment]::SetEnvironmentVariable("PATH", [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::Machine) + ";$binPath", [System.EnvironmentVariableTarget]::Machine)
}

# Verificar la instalación
protoc --version
