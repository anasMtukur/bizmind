FROM openjdk:12
VOLUME /tmp
RUN apt-get update \
 && apt-get -yq install jq curl
COPY target/*.jar bizmind-0.0.1.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=prod","-jar","/bizmind-0.0.1.jar"]
EXPOSE 1212
HEALTHCHECK --start-period=15s --interval=1m --timeout=10s --retries=5 \
            CMD curl --silent --fail --request GET http://localhost:1212/health \
                | jq --exit-status '.status == "UP"' || exit 1