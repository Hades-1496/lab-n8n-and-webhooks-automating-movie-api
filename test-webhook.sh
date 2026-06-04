# Guarda este script como test-webhook.sh
BODY='{"event_id":"test-001","titulo":"Avatar","anio":2009,"nota":7.9,"director":"James Cameron","genero":"ciencia-ficcion"}'
SECRET="mi-secreto-super-seguro-2024"
FIRMA="sha256=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"

curl -X POST http://localhost:3000/webhooks/peliculas \
  -H "Content-Type: application/json" \
  -H "x-webhook-signature: $FIRMA" \
  -d "$BODY"