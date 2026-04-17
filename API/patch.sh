#!/bin/bash

curl -X PATCH -i http://localhost:3000/wisata/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: PuncakMasAdmin123" \
  -d '{
    "hargaTiket": 35000
  }'