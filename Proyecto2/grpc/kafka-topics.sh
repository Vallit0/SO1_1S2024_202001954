#!/bin/bash
# Script para crear topics en Kafka

kafka-topics.sh --create --if-not-exists --bootstrap-server localhost:9092 --topic mi-topic --partitions 1 --replication-factor 1
