#!/bin/bash
# go into backend folder
cd backend

# build the Spring Boot app (skip tests to be faster)
./mvnw -DskipTests package

# run the jar (change name if your jar is different)
java -jar target/demo-0.0.1-SNAPSHOT.jar
