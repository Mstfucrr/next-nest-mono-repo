#!/bin/sh
# tree komutunu yükle
apk add --no-cache tree

echo "==== /app içeriği ===="
tree /app -L 1
echo "==== /app/dist içeriği ===="
tree /app/dist
# echo "==== /app/node_modules içeriği ===="
# tree /app/node_modules -L 1
echo "==== /app/dist/libs/shared-utils/src içeriği ===="
tree /app/dist/libs/shared-utils/src
# echo "==== /app/dist/apps/services/product-service içeriği ===="
# tree /app/dist/apps/services/product-service
echo "==== Çalıştırılıyor: $@ ===="
exec "$@"