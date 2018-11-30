package main

import (
	"encoding/base64"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/gorilla/mux"
)

// Csv location structure
type Csv struct {
	Location string `json:"location"`
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/csv", csvPostHandler).Methods("POST")

	log.Fatal(http.ListenAndServe(":9090", router))
	// getCsvFile("data.csv")
}

func csvPostHandler(w http.ResponseWriter, r *http.Request) {

	//Retrieve body from http request
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		panic(err)
	}

	//Save data into Csv struct
	var csvlocation Csv
	err = json.Unmarshal(b, &csvlocation)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	locationString := string(csvlocation.Location)
	fmt.Printf("locationString is: %s\n", locationString)

	go getCsvFile(locationString)

	//Convert csvlocation struct into json
	jsonString, err := json.Marshal(csvlocation)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(jsonString)

}

func getCsvFile(strval string) {
	var numbatch = ""
	var strbatch = ""
	messages := make(chan string, 6000)
	csvFile, _ := os.Open(strval)
	reader := csv.NewReader(csvFile)
	var reslts []string
	var tcount int
	for {
		line, error := reader.Read()
		// tcount++
		if error == io.EOF {
			if numbatch != "" {
				reslts = append(reslts, numbatch)
				messages <- numbatch
				go sendLineToKafka(<-messages)
			}
			if strbatch != "" {
				reslts = append(reslts, strbatch)
				messages <- strbatch
				go sendLineToKafka(<-messages)
			}
			break
		} else if error != nil {
			log.Fatal(error)
		}
		if _, err := strconv.Atoi(line[0]); err == nil {
			if numbatch == "" {
				numbatch = line[0]
			} else {
				numbatch = numbatch + "," + line[0]
			}
			if strbatch != "" {
				tcount++
				reslts = append(reslts, strbatch)
				messages <- strbatch
				strbatch = ""
				sendLineToKafka(<-messages)
			}
		} else {
			if strbatch == "" {
				strbatch = line[0]
			} else {
				strbatch = strbatch + "," + line[0]
			}
			if numbatch != "" {
				tcount++
				reslts = append(reslts, numbatch)
				messages <- numbatch
				numbatch = ""
				sendLineToKafka(<-messages)
			}
		}
	}
	fmt.Printf("Total Sent Count: %d\n", tcount)

	file, err := os.Create("result.txt")
	if err != nil {
		log.Fatal("Cannot create file", err)
	}
	defer file.Close()
	// writes a slice of strings to a file, one per line
	sep := "\n"
	for _, line := range reslts {
		if _, err = file.WriteString(line + sep); err != nil {
			panic(err)
		}
	}
}

func checkBase64Values(val string) string {
	decoded, err := base64.StdEncoding.DecodeString(val)
	if err != nil {
		fmt.Println("base64 error: ", val)
		if _, ok := err.(base64.CorruptInputError); ok {
			panic("\nbase64 input is corrupt, check service Key")
		}
		panic(err)
	}
	return string(decoded)
}

func sendLineToKafka(line string) {
	fmt.Printf("sending line to kafka topic: %s\n", line)
	p, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
	})
	if err != nil {
		panic(err)
	}

	// Produce messages to topic (asynchronously)
	topic := "bTopic"
	for _, word := range []string{string(line)} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
		time.Sleep(1 * time.Second)
	}
}
