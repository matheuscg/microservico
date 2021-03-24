FROM maven:3.6.3-openjdk-8

RUN  mkdir /opt/app

WORKDIR /opt/app

COPY ./pom.xml /opt/app/pom.xml

RUN mvn dependency:resolve

COPY ./src /opt/app/src

RUN mvn clean package -DskipTests

FROM openjdk:8-slim

EXPOSE 8080

COPY --from=0 /opt/app/target/supportservice*.jar /opt/supportservice/supportservice.jar

WORKDIR /opt/supportservice

RUN useradd supportservice
RUN chown -R supportservice /opt/supportservice

USER supportservice

CMD ["java", "-jar", "supportservice.jar"]
