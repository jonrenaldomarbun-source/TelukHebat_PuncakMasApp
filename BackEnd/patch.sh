#!/bin/bash

curl -X PATCH -i http://localhost:3000/wisata/1 \
  -H "Content-Type: application/json" \
  -d '{
    "hargaTiket": 30000
  }'