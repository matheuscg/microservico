from flask import Flask
from flask_cors import CORS, cross_origin
from flask_eureka import Eureka
import socket

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

app = Flask(__name__)
CORS(app)

eureka = Eureka(app)

eureka.register_service(name="users", vip_address=local_ip)