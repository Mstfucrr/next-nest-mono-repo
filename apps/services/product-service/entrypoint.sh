#!/bin/sh
# tree komutunu yükle
apk add --no-cache tree

echo "==== /app içeriği ===="
tree /app -L 1
echo "==== /app/dist içeriği ===="
tree /app/dist
echo "==== /app/node_modules/@dailyshop/shared-utils/dist içeriği ===="
tree /app/node_modules/@dailyshop/shared-utils/dist -L 1




#app/node_modules/@dailyshop/shared-utils/package.json
echo "==== /app/node_modules/@dailyshop/shared-utils/package.json içeriği ===="
cat /app/node_modules/@dailyshop/shared-utils/package.json



echo "==== /app/node_modules/@dailyshop/shared-utils içeriği ===="
tree /app/node_modules/@dailyshop/shared-utils
# echo "==== /app/dist/apps/services/product-service içeriği ===="
# tree /app/dist/apps/services/product-service
echo "========================================="
echo "==== Çalıştırılıyor: $@ ===="
exec "$@"