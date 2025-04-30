# Use official JDK 21 as a parent image
FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy Maven files first for better caching
COPY pom.xml .
COPY src ./src

# Package the app
RUN mvn package -DskipTests

# -------------------
# Runtime stage
# -------------------
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy only the built JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Set Spring profile
ENV SPRING_PROFILES_ACTIVE=docker

# Expose Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]