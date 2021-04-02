import pika
import json 

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

user = {
    "id": 1,
    "name": "matheus"
}

channel.queue_declare(queue="new-user")

channel.basic_publish(exchange='',
                      routing_key='new-user',
                      body=json.dumps(user))

print(" [x] Sent 'new user!'")