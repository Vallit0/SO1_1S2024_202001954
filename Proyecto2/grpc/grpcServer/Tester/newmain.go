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
	fmt.Println("-voto para: ", in.GetName())
	data := Data{
		Name:  in.GetName(),
		Year:  in.GetYear(),
		Album: in.GetAlbum(),
		Rank:  in.GetRank(),
	}

	conn, err := kafka.DialLeader(context.Background(), "tcp", kafkaBroker, kafkaTopic, 0)
	if err != nil {
		log.Fatalf("Error connecting to Kafka: %v", err)
	}
	defer conn.Close()

	// Produce el mensaje
	message := fmt.Sprintf("%s,%s,%s,%s", data.Name, data.Album, data.Year, data.Rank)
	_, err = conn.WriteMessages(
		kafka.Message{
			Value: []byte(message),
		},
	)
	if err != nil {
		log.Fatalf("Error producing message to Kafka: %v", err)
	}

	fmt.Println("Message sent to Kafka!")

	return &pb.ReplyInfo{Info: "--"}, nil
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

