FROM maven:3.6.3-openjdk-8

RUN  mkdir /opt/app

COPY ./pom.xml /opt/app/pom.xml
COPY ./src /opt/app/src

WORKDIR /opt/app

RUN mvn clean package -DskipTests

FROM tomcat:9.0-jre8-alpine

EXPOSE 8761

COPY --from=0 /opt/app/target/discover*.war $CATALINA_HOME/webapps/discover.war
