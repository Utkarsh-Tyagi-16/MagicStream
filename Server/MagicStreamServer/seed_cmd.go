package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"github.com/GavinLonDigital/MagicStream/Server/MagicStreamServer/database"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func main() {
	client := database.Connect()
	if client == nil {
		log.Fatal("Could not connect to MongoDB")
	}

	seedData(client, "movies", "../../magic-stream-seed-data/movies.json")
	seedData(client, "users", "../../magic-stream-seed-data/users.json")
	seedData(client, "genres", "../../magic-stream-seed-data/genres.json")
	seedData(client, "rankings", "../../magic-stream-seed-data/rankings.json")

	fmt.Println("Database seeded successfully!")
}

func seedData(client *mongo.Client, collectionName, filePath string) {
	collection := database.OpenCollection(collectionName, client)
	
	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Printf("Error reading %s: %v", filePath, err)
		return
	}

	var data []interface{}
	if err := json.Unmarshal(bytes, &data); err != nil {
		log.Printf("Error unmarshaling %s: %v", filePath, err)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

    collection.Drop(ctx) // clear any existing data first

	_, err = collection.InsertMany(ctx, data)
	if err != nil {
		log.Printf("Error inserting data into %s: %v", collectionName, err)
	} else {
		fmt.Printf("Successfully seeded %s\n", collectionName)
	}
}
