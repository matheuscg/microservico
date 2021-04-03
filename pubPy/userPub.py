import pika
import json 

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

user = {
    "id": 15,
    "name": "teste"
}

channel.queue_declare(queue="new-user")

channel.basic_publish(exchange='new-user',
                      routing_key='new-user',
                      body=json.dumps(user).encode("utf-8"))

print(" [x] Sent 'new user!'")
