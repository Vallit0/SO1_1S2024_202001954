# Manual Técnico ⛵ 🎡

## Introducción

En este manual técnico, se describe el proceso de implementación y operación de un sistema utilizando Kubernetes (K8s) y otras tecnologías relacionadas. Se proporciona una guía paso a paso para comprender la arquitectura del sistema y su despliegue.

## Objetivos

Los objetivos de este manual técnico son:

- Proporcionar una visión general de las tecnologías utilizadas en el sistema.
- Explicar el proceso de despliegue en Kubernetes.
- Demostrar el funcionamiento del sistema a través de ejemplos prácticos.

## Tecnologías Utilizadas

Se utilizan las siguientes tecnologías en el sistema:
![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/29410f27-6ad9-4797-8fc9-f934d496b5d7)

- Kubernetes (K8s): Plataforma de orquestación de contenedores.
- Docker: Herramienta de contenerización.
- Locust: Herramienta de prueba de carga.
- gRPC: Marco de trabajo de comunicación remota.
- Kafka: Plataforma de streaming distribuido.
- Go: Lenguaje de programación utilizado en el desarrollo.
- Rust: Lenguaje de programación utilizado en el desarrollo.
- Redis: Sistema de almacenamiento en memoria.
- MongoDB: Base de datos NoSQL.
- Grafana: Plataforma de análisis y visualización de datos.


## Descripción de Despliegues y Servicios de K8s

Se detalla la configuración de cada despliegue y servicio de Kubernetes utilizado en el sistema. Esto incluye:

- Servicios> Se utilizaron servicios de los cuales se debio implementar la exposicion de ciertas arquitecturas, por ejemplo, el uso de algunos endopints vitales al testeo como /insert en ingress.
- ![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/cb8cd75c-9379-4bcc-96eb-68a061be799e)
- ![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/48f33cca-2789-42af-ad3c-9d9d2329acc1)

- Algunos Deployments Generales:
- ![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/270daaec-0886-4740-b8b5-11ec2d8a7dad)

- La imagen muestra que el programa "grpc-client" se ha implementado en Kubernetes como un despliegue con una sola réplica. El despliegue se encuentra en estado "Ready", lo que significa que todos los pods del despliegue han sido creados y están listos para ejecutar la aplicación
- 


- ## Replicas y Demas
   ![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/e1b09020-b04c-4985-b6a2-618095d24117)


## Ejemplo de Funcionamiento
![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/f6980e03-393c-4ade-b4f5-fbe22dfb7e32)

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/5d4131ce-5442-4027-8453-e477a7ab611e)

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/a3989cc6-725a-41b4-a121-72ca9397e657)
![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/71d952bb-b562-420c-896b-00dc3f830555)


## Conclusiones

En conclusión, el uso de Kubernetes y otras tecnologías proporciona una infraestructura flexible y escalable para implementar y operar sistemas modernos en entornos de contenedores.

¡Gracias por leer nuestro manual técnico! 🚀
