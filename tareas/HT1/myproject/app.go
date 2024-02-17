package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Estructura para almacenar los datos de memoria
type MemoriaRAM struct {
	Usado int `json:"usado"`
	Libre int `json:"libre"`
}

func (a *App) ObtenerMemoriaRAM() (string, error) {
	// Asumiendo que el comando devuelve algo como "1234 5678"
	fmt.Printf("Obteniendo memoria RAM...\n")
	cmd := exec.Command("cat", "/proc/ram_202001954")
	fmt.Printf("Ejecutando comando: %s\n", cmd.String())
	var out strings.Builder
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return "", err
	}

	// Parsear la salida
	partes := strings.Split(out.String(), " ")
	if len(partes) < 2 {
		return "", fmt.Errorf("formato de salida inesperado")
	}

	usado, libre := partes[0], partes[1]

	// Convertir a estructura y luego a JSON
	datosMemoria := MemoriaRAM{
		Usado: convertirAInt(usado),
		Libre: convertirAInt(libre),
	}

	jsonMemoria, err := json.Marshal(datosMemoria)
	if err != nil {
		return "", err
	}
	fmt.Printf("Memoria RAM: %s\n", jsonMemoria)
	return string(jsonMemoria), nil
}

// Función auxiliar para convertir string a int
func convertirAInt(numeroStr string) int {
	var numero int
	fmt.Sscanf(numeroStr, "%d", &numero)
	return numero
}
