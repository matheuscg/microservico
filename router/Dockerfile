FROM maven:3.6.3-openjdk-8

RUN  mkdir /opt/app

COPY ./pom.xml /opt/app/pom.xml
COPY ./src /opt/app/src

WORKDIR /opt/app

RUN mvn clean package -DskipTests

FROM openjdk:8-slim

EXPOSE 8080

COPY --from=0 /opt/app/target/router*.jar /opt/router/router.jar

WORKDIR /opt/router

CMD [ "java", "-jar", "router.jar" ]
