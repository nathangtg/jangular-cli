# Use official JDK 21 as a parent image
FROM eclipse-temurin:21-jdk-jammy AS build

# Set the working directory
WORKDIR /app

# Copy the Maven POM file
COPY pom.xml .

# Copy the source code
COPY src ./src

# Package the application
RUN apt-get update && apt-get install -y maven
RUN mvn package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built artifact from the build stage
COPY --from=build /app/target/*.jar app.jar

# Set Spring Boot profile to use environment-specific configuration if needed
ENV SPRING_PROFILES_ACTIVE=docker

# Expose the default Spring Boot port
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]