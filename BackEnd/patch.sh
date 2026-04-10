#!/bin/bash

curl -X PATCH -i http://localhost:3000/wisata/088fc59d-26a0-4c32-a8f1-edf4170be093 \
  -H "Content-Type: application/json" \
  -d '{
    "hargaTiket": 35000
  }'