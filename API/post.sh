#!/bin/bash

curl -X POST -i http://127.0.0.1:3000/wisata \
  -H "Content-Type: application/json" \
  -H "Authorization: PuncakMasAdmin123" \
  -d '{
    "tanggal": "2026-04-17",
    "nama": "Budi",
    "jumlah": 3,
    "hargaTiket": 25000
  }'