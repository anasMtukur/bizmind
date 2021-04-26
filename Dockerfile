FROM openjdk:8-jdk-alpine
VOLUME /tmp
RUN apk update \
 && apk add jq curl
COPY target/*.jar qna-0.0.1.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=prod","-jar","/bizmind-0.0.1.jar"]
EXPOSE 8080
HEALTHCHECK --start-period=15s --interval=1m --timeout=10s --retries=5 \
            CMD curl --silent --fail --request GET http://localhost:8080/health \
                | jq --exit-status '.status == "UP"' || exit 1