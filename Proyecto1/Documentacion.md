# Documentación del Proyecto: Plataforma de Monitoreo y Señales a Procesos 📊

## Universidad de San Carlos de Guatemala

### Facultad de Ingeniería

#### Escuela de Ciencias y Sistemas

**Sistemas Operativos 1 Sección N**

**Ingeniero Jesús Guzmán Polanco**

**Auxiliares: José Daniel Velásquez Orozco, Jhonathan Daniel Tocay**

---

## Índice

- [Objetivos](#objetivos-)
- [Introducción](#introducción-)
- [Arquitectura](#arquitectura-)
- [Implementación](#implementación-)
  - [Módulos del Kernel](#módulos-del-kernel-)
  - [Plataforma de Monitoreo](#plataforma-de-monitoreo-)
  - [API Golang](#api-golang-)
  - [Base de Datos](#base-de-datos-)
  - [Docker Compose](#docker-compose-)
- [Requisitos Mínimos y Restricciones](#requisitos-mínimos-y-restricciones-)
- [Entregables](#entregables-)
- [Referencias](#referencias-)

---

## Objetivos 🎯

- Conocer el Kernel de Linux mediante módulos de C.
- Hacer uso de programación asíncrona con rutinas de Golang.
- Comprender el funcionamiento de los contenedores usando Docker.

## Introducción 📜

El proyecto tiene como objetivo principal implementar un sistema de monitoreo de recursos del sistema y gestión de procesos empleando varias tecnologías y lenguajes de programación. Esto permitirá obtener información clave sobre el rendimiento del computador y sus procesos en ejecución a través de una interfaz amigable.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/e2585e2e-19a9-4b9c-8eea-957cf7c7f24a)


## Arquitectura 🏗️

El proyecto se implementará en una máquina virtual con Ubuntu Server 22.04, haciendo uso de módulos del Kernel, una API en Golang, y una interfaz de usuario desarrollada en React.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/90a8567a-21ee-4a0d-a523-b2e0d5dc9790)


## Implementación 🛠️

### Módulos del Kernel 📚

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/656d027e-7862-4499-93d8-1ebc7e11ce85)

- **Módulo de RAM**: Proporciona información sobre el uso de memoria RAM.
  - Importa `sys/sysinfo.h`, `linux/mm.h`.
  - El nombre del módulo es: `ram_so1_1s2024`.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/8c51e9f2-1beb-4066-83f1-cc38ae90cdfe)


- **Módulo de CPU**: Ofrece detalles sobre la utilización del CPU.
  - Importa `linux/sched.h`, `linux/sched/signal.h`.
  - El nombre del módulo es: `cpu_so1_1s2024`.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/be9631e8-9a99-4929-9d33-b83c7a1283a4)


### Plataforma de Monitoreo 💻

- **Frontend**: Desarrollado en React, muestra gráficas en tiempo real y a lo largo del tiempo de la utilización del CPU y la memoria RAM.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/9c542a11-4a7f-4486-90cf-ee6a3f819b6d)
![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/10e940fa-e62a-4513-95ac-4c1ad6ce55cc)

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/3c83b633-023e-4780-aaa4-88d091ac3262)



### API Golang 🐹

Encargada de realizar llamados a los módulos, almacenar datos en MySQL, y enviar datos al frontend.



### Base de Datos 🗃️

Implementación de una base de datos MySQL en un contenedor Docker para persistencia de datos.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/034f467a-7579-4bf6-94b9-284470e4c1ca)


### Docker Compose 🐳

Utilizado para gestionar los contenedores de la plataforma de monitoreo de manera eficiente.

![image](https://github.com/Vallit0/SO1_1S2024_202001954/assets/79114580/63d7860f-50f8-4b6d-9c90-2b721bde9047)




## Referencias 📚

- Docker
- Docker Compose
- Libro Operating System Concepts, tenth edition
