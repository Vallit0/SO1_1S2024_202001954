package main

import (
    "context"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    ctx := context.Background()
    mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://mongodb:27017"))
    if err != nil {
        log.Fatal("failed to connect to mongo:", err)
    }
    mongoCollection := mongoClient.Database("testdb").Collection("records")

    r := gin.Default()

    r.GET("/records", func(c *gin.Context) {
        var results []*MusicRecord
        cursor, err := mongoCollection.Find(ctx, bson.M{}) // Consulta todos los documentos
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        defer cursor.Close(ctx)
        for cursor.Next(ctx) {
            var record MusicRecord
            if err = cursor.Decode(&record); err != nil {
                log.Fatal("cursor.Decode error:", err)
            }
            results = append(results, &record)
        }
        c.JSON(http.StatusOK, results)
    })

    r.Run(":8080") // listen and serve on 0.0.0.0:8080
}
