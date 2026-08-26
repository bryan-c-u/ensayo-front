FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 3007
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
