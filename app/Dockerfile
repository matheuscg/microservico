FROM python:3.9.3-alpine3.12
WORKDIR /src
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./src /src
EXPOSE 5010
CMD python main.py
