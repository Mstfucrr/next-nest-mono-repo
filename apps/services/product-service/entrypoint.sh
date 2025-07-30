#!/bin/sh
# tree komutunu yükle
apk add --no-cache tree

echo "==== /app içeriği ===="
tree /app -L 1
echo "==== /app/dist içeriği ===="
tree /app/dist



echo "==== /app/libs/shared-types/dist içeriği ===="
tree /app/libs/shared-types/dist

echo "==== /app/dist/libs/shared-types içeriği ===="
tree /app/dist/libs/shared-types

echo "========================================="
echo "==== Çalıştırılıyor: $@ ===="
exec "$@"