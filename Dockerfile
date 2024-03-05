FROM nginx:1.23.3

LABEL org.opencontainers.image.title="magjob-frontend"
LABEL org.opencontainers.image.authors="Damian Łączyński, Tomasz (ekmot) Lewandowski, Sebastian (WallyS) Kutny"
LABEL org.opencontainers.image.source="https://github.com/KeepIt-Up/MagJob"
LABEL org.opencontainers.image.url="https://github.com/KeepIt-Up/MagJob"
LABEL org.opencontainers.image.vendor="KeepIt-Up"
LABEL org.opencontainers.image.version="0.0.1"
LABEL org.opencontainers.image.description="MagJob frontend"
#LABEL org.opencontainers.image.licenses="MIT"

LABEL build_version=""
LABEL maintainer=""

ENV VERSION="0.0.1"

ENV API_URL http://localhost:8080/api

EXPOSE 80

ADD dist/magjob-frontend /usr/share/nginx/html/
ADD docker/etc/nginx/templates/ /etc/nginx/templates/
