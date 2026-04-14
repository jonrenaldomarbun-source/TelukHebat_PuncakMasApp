#!/bin/bash

curl -X POST -i http://127.0.0.1:3000/wisata \
  -H "Content-Type: application/json" \
  -H "authorization: PuncakMasAdmin123" \
  -d '{
    "nama": "Puncak Mas 3",
    "lokasi": "Lampung",
    "deskripsi": "Wisata Bagus",
    "fasilitas": ["Spot Foto", "Cafe"],
    "hargaTiket": 20000,
    "jamBuka": "08:00",
    "pengunjung": 100
  }'