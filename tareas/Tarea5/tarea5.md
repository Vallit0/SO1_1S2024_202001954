## Dashboard de rendimiento de Redis (Versión completa)

### Panel 1: Métricas clave de Redis

- **Tipo de visualización:** Gráfico de líneas
- **Fuente de datos:** Redis
- **Métricas:**
  - **Número de claves:** Muestra la cantidad total de claves almacenadas en Redis.
  - **Uso de memoria:** Indica la cantidad de memoria utilizada por Redis para almacenar datos.
  - **Solicitudes por segundo:** Representa la tasa de solicitudes recibidas por Redis en un segundo.
  - **Tiempo promedio de respuesta:** Muestra el tiempo promedio que tarda Redis en responder a una solicitud.
  - **Fallos de solicitud:** Indica el número de solicitudes que no pudieron ser procesadas exitosamente por Redis.

### Panel 2: Distribución de claves por tipo de dato

- **Tipo de visualización:** Gráfico de barras
- **Fuente de datos:** Redis
- **Métricas:**
  - **Claves de cadena:** Muestra la cantidad de claves que almacenan datos de tipo cadena.
  - **Claves de lista:** Indica la cantidad de claves que almacenan datos de tipo lista.
  - **Claves de conjunto:** Representa la cantidad de claves que almacenan datos de tipo conjunto.
  - **Claves de hash:** Muestra la cantidad de claves que almacenan datos de tipo hash.
  - **Claves de conjunto ordenado:** Indica la cantidad de claves que almacenan datos de tipo conjunto ordenado.

### Panel 3: Distribución de comandos por tipo

- **Tipo de visualización:** Gráfico de tarta
- **Fuente de datos:** Redis
- **Métricas:**
  - **Comandos GET:** Muestra la cantidad de comandos GET ejecutados en Redis.
  - **Comandos SET:** Indica la cantidad de comandos SET ejecutados en Redis.
  - **Comandos DELETE:** Representa la cantidad de comandos DELETE ejecutados en Redis.
  - **Comandos LPUSH/RPUSH:** Muestra la cantidad de comandos LPUSH y RPUSH ejecutados para listas en Redis.
  - **Comandos SADD:** Indica la cantidad de comandos SADD utilizados para añadir elementos a conjuntos.
  - **Otros comandos:** Agrupa el total de otros comandos utilizados que no se categorizan en los anteriores.

### Panel 4: Rendimiento del sistema

- **Tipo de visualización:** Gráfico de área
- **Fuente de datos:** Monitoreo del sistema
- **Métricas:**
  - **CPU utilizada por Redis:** Muestra el porcentaje de la CPU utilizada específicamente por los procesos de Redis.
  - **I/O de disco:** Indica las operaciones de entrada/salida de disco realizadas por Redis, relevante para operaciones de persistencia.
  - **Ancho de banda de red:** Muestra el uso del ancho de banda de red debido a la actividad de Redis.
  - **Latencia de red:** Indica la latencia en la comunicación de la red que podría afectar el rendimiento de Redis.
  - **Conexiones activas:** Representa el número de conexiones activas a Redis en tiempo real.

### Panel 5: Alertas y eventos

- **Tipo de visualización:** Lista
- **Fuente de datos:** Sistema de alertas de Redis
- **Métricas:**
  - **Alertas de memoria alta:** Lista las instancias donde Redis ha consumido una cantidad crítica de memoria.
  - **Fallos de conexión:** Enumera los eventos donde las conexiones a Redis han fallado o han sido rechazadas.
  - **Brechas de seguridad:** Registra intentos de acceso no autorizados o comportamientos anómalos detectados.
  - **Actualizaciones de configuración:** Muestra cambios en la configuración de Redis que podrían afectar el rendimiento o la seguridad.
  - **Interrupciones del servicio:** Indica cualquier interrupción en el servicio de Redis, ya sea por mantenimiento planificado o problemas imprevistos.
