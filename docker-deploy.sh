#!/bin/bash
set -euo pipefail

IMAGE="transitsave"
VERSION="${1:-v1.0.0}"
NAME="transitsave"
PORT=3000

# 1. Is Docker running?
if ! docker info > /dev/null 2>&1; then
  echo "ERROR: Docker is not running or not reachable."
  exit 1
fi

# 2. Build with a version tag
echo "Building $IMAGE:$VERSION ..."
docker build -t "$IMAGE:$VERSION" .

# 3. Check image size
SIZE=$(docker images "$IMAGE:$VERSION" --format "{{.Size}}")
echo "Image size: $SIZE"

# 4. Replace any old container, run the new one
docker rm -f "$NAME" > /dev/null 2>&1 || true
docker run -d --name "$NAME" -p "$PORT:80" "$IMAGE:$VERSION"

# 5. Wait for nginx to start
echo "Waiting 5 seconds..."
sleep 5

# 6. Verify it is up
if curl -fs "http://localhost:$PORT/health" > /dev/null; then
  echo "SUCCESS: TransitSave is live at http://localhost:$PORT"
else
  echo "ERROR: app did not respond. Logs:"
  docker logs "$NAME"
  exit 1
fi
