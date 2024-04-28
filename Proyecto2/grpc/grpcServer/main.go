package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "grpcServer/server"

	"github.com/segmentio/kafka-go"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedGetInfoServer
}

const (
	port          = ":3001"
	kafkaBroker   = "kafka:9092"
	kafkaTopic    = "test-topic"
	kafkaUsername = "" // Coloca aquí tu nombre de usuario de Kafka si lo requieres
	kafkaPassword = "" // Coloca aquí tu contraseña de Kafka si lo requieres
)

type Data struct {
	Name  string
	Album string
	Year  string
	Rank  string
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
    log.Printf("Voto para: %s", in.GetName())
    data := Data{
        Name:  in.GetName(),
        Year:  in.GetYear(),
        Album: in.GetAlbum(),
        Rank:  in.GetRank(),
    }

    conn, err := kafka.DialLeader(ctx, "tcp", kafkaBroker, kafkaTopic, 0)
    if err != nil {
        log.Printf("Error connecting to Kafka: %v", err)
        return nil, err
    }
    defer conn.Close()

    message := fmt.Sprintf("%s,%s,%s,%s", data.Name, data.Album, data.Year, data.Rank)
    _, err = conn.WriteMessages(
        kafka.Message{
            Value: []byte(message),
        },
    )
    if err != nil {
        log.Printf("Error producing message to Kafka: %v", err)
        return nil, err
    }

    log.Println("Message sent to Kafka!")

    return &pb.ReplyInfo{Info: "Información enviada con éxito"}, nil
}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}

