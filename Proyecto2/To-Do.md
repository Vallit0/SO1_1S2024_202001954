# Generalidades a trabajar
[ ] Cluster de Kubernetes 
[ ] Docker de Todos los Microservicios 

## Productores y Consumidores 
[ ] gRPC en Golang 
[ ] Webassembly 
## Servicios locales
[ ] Integracion de Locust 
## Integracion de Kafka 


/proyecto-kubernetes/
  /locust/
    - locustfile.py  # Done  
  /grpc/
    - server.go
    - client.go
    - Dockerfile
  /wasm/
    - main.rs
    - Dockerfile
  /kafka/
    - kafka-config.yaml
  /consumidor/
    - consumer.go
    - Dockerfile
  /bases-de-datos/
    /redis/
      - Dockerfile
    /mongo/
      - Dockerfile
  /grafana/
    - grafana-config.yaml
  /cloud-run/
    /api/
      - server.js
      - Dockerfile
    /webapp/
      - main.js
      - Dockerfile
  /kubernetes-manifests/
    - locust-deployment.yaml
    - grpc-deployment.yaml
    - wasm-deployment.yaml
    // y así sucesivamente para cada servicio
  /docker-compose.yml
  /README.md
