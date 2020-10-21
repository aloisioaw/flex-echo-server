#!/bin/sh -x

CERT_FILE=../cert.pem
KEY_FILE=../key.pem

if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
  rm $CERT_FILE
  rm $KEY_FILE

  echo "Creating certificates..."
  # Extracted from https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
  echo "Creating key.pem"
  openssl genrsa -out key.pem
  echo "Creating csr.pem"
  #openssl req -nodes -new -key key.pem -out csr.pem
  openssl req -new -key key.pem \
    -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" \
    -keyout www.example.com.key -out csr.pem

  echo "Creating cert.pem"
  openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
  echo "Removing csr.pem"
  rm csr.pem
  # echo "Moving cert.pem"
  # mv cert.pem ../
  # echo "Moving key.pem"
  # mv key.pem ../
else
  echo "It was not necessary to create certificates"
fi