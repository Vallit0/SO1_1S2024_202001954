import redis

# Conexión al cliente de Redis
client = redis.Redis(host='10.98.34.133', port=6379, db=0)

# Define una función de callback para cuando se reciba un mensaje
def handle_message(message):
    print(f"Mensaje recibido: {message['data']}")

# Configura el suscriptor
pubsub = client.pubsub()
pubsub.subscribe(**{'test': handle_message})

# Escucha mensajes entrantes
print('Suscriptor de Redis escuchando mensajes...')
pubsub.run_in_thread(sleep_time=0.001)

