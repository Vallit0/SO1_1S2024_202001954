package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	pb "grpcClient/client"
)

var ctx = context.Background()

type Data struct {
	Name  string
	Album string
	Year  string
	Rank  string
}

func insertData(c *fiber.Ctx) error {
	fmt.Println("Request Recibido")
	var data map[string]string
	fmt.Println("Parsing Datos")
	e := c.BodyParser(&data)
	if e != nil {
		fmt.Println("Error Parseando los datos")
		return e
	}

	ranks := Data{
		Name:  data["name"],
		Album: data["album"],
		Year:  data["year"],
		Rank:  data["rank"],
	}
	fmt.Println("Obteniendo credenciales")
	conn, err := grpc.Dial("grpc-server:3001", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
    	fmt.Println("Error al establecer la conexión gRPC:", err)
    	log.Fatalln(err)
    	return err
	}

	fmt.Println("Conexión establecida con el servidor gRPC")

	fmt.Println("Get info del cliente")
	cl := pb.NewGetInfoClient(conn)
	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			fmt.Println("Error aqui")
			log.Fatalln(err)
		}
	}(conn)
	fmt.Println("New info creada")
	ret, err := cl.ReturnInfo(ctx, &pb.RequestId{
		Name:  ranks.Name,
		Album: ranks.Album,
		Year:  ranks.Year,
		Rank:  ranks.Rank,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Respuesta del server " + ret.GetInfo())

	return nil
}

/*func convertToInt(s string) {
	panic("unimplemented")
}*/

func main() {
	app := fiber.New()
	app.Post("/insert", insertData)
	app.Get("/", func(c *fiber.Ctx) error {
        // Esta función se ejecutará cuando se haga una solicitud GET a "/"
        fmt.Println("Este es un test")
        return c.SendString("¡Hola, mundo!")
    	})
	err := app.Listen(":3000")
	if err != nil {
		log.Fatalln(err)
		return
	}
}

