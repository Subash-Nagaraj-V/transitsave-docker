# TransitSave: Docker Implementation

A React 18 + TypeScript + Vite PWA, containerized with Docker as a DevOps learning exercise.

**Environment:** native Ubuntu (dual boot with Windows 11), **not WSL2**. Docker Engine 29.8.2 and Compose v5.6.0, installed from Docker's apt repository.

## Architecture

    Browser (localhost:3000)
            |
            |  -p 3000:80  (port mapping)
            v
    +----------------------- Docker host (Ubuntu) ------------------------+
    |  transitsave-net (custom bridge network)                             |
    |   +--------------------------------------------------------------+  |
    |   |  Container: transitsave   (nginx:alpine)                     |  |
    |   |   - serves /usr/share/nginx/html   (built React app)        |  |
    |   |   - /etc/nginx/conf.d/default.conf <-- bind mount, :ro      |  |
    |   |   - /var/log/transitsave           <-- named volume          |  |
    |   |   - healthcheck: GET /health every 30s                       |  |
    |   +--------------------------------------------------------------+  |
    +----------------------------------------------------------------------+

    Build time (multi-stage):
    [Stage 1: node:20-alpine]  npm ci -> npm run build -> /app/dist
                                                            |
    [Stage 2: nginx:alpine]  <------ COPY --from=builder ----+
    (Node, node_modules and source code never reach the final image)

## Decisions and why

| Decision | Why |
|---|---|
| Docker Engine, not Docker Desktop | Native Linux needs no VM, saving RAM (8 GB) and disk (45 GB root partition) |
| Multi-stage build | Final image only needs static files and nginx, not Node |
| `node:20-alpine`, not 18 | Node 18 is end-of-life, and Alpine keeps the base small |
| `package*.json` copied before source | Layer caching: `npm ci` (about 100 s) is skipped when only `src/` changes |
| `npm ci`, not `npm install` | Exact, repeatable installs from `package-lock.json` |
| `.dockerignore` | Keeps `node_modules`, `.git` and junk files out of the build context |
| `try_files ... /index.html` | React SPA routing: refreshing on any route must not 404 |
| `no-cache` on `sw.js` and `index.html` | PWA service worker must never be cached, or users get stuck on old versions |
| 1-year `immutable` cache on `/assets/` | Vite hashes those file names, so they are safe to cache forever |
| `/health` endpoint | Used by the Compose healthcheck and the deploy script |
| Custom bridge network | Container-to-container DNS by name (the default bridge has none) |
| `:ro` bind mount for nginx config | The container can read its config but cannot change it |
| Named volume for logs | Logs survive container deletion |
| `restart: unless-stopped` | Container recovers after a crash or reboot |

## Image size comparison

| Image | Disk size | Compressed (Docker Hub push) |
|---|---|---|
| Single-stage (Node + vite preview), `Dockerfile.single` | 993 MB | 233 MB |
| Multi-stage (nginx:alpine), `Dockerfile` | 99.2 MB | 28.8 MB |

The multi-stage image is about **10x smaller**. The single-stage image carries 416 MB of `node_modules`, plus Node and npm, none of which are needed to serve static files.

## Problems faced and solutions

| Problem | Cause | Solution |
|---|---|---|
| `newgrp: command not found`; Docker group not applied | Shell was logged in as root, so `$USER` was `root` | Exit root, run `usermod -aG docker <username>` with the explicit name, log in again |
| `ls: cannot access ... No such file` | Folder name had spaces, and `~/home/...` doubled the path | Quote paths, use `$HOME`, copy project to a space-free path |
| `package.json` not found | ZIP contained a nested folder | Work inside the inner folder |
| `docker build` "requires 1 argument" | Forgot the final `.` (build context) | `docker build -t transitsave:v1 .` |
| Dockerfile lines missing or garbled | Multi-line paste into nano dropped lines; typos (`ROM`, missing space) | Type by hand or use heredocs, verify with `cat` and `grep` |
| `curl: Connection reset by peer` | curl ran before nginx finished starting | Wait a few seconds; the deploy script uses `sleep 5` |
| Empty `/var/log/nginx` volume | Official nginx image links its logs to stdout | Write the access log to `/var/log/transitsave` and mount the volume there |
| Config edit not visible | nginx only reads config on reload | `docker exec transitsave nginx -s reload` |
| `ping web-default` failed | Default bridge has no DNS | Use a custom bridge network (or ping by IP) |
| `.NetworkSettings.IPAddress` error | Field removed in newer Docker | Use `.NetworkSettings.Networks.bridge.IPAddress` |
| Image above the 50 MB target | `nginx:alpine` alone is about 50 MB | Compressed push size is 28.8 MB, so the target is met where it matters |

## Native Ubuntu vs WSL2

This was built on native Ubuntu, so:
- Docker Engine installs from the apt repository, with no Desktop app and no hidden VM.
- Containers share the real host kernel (no extra virtualization layer).
- Named volumes live directly on the ext4 disk at `/var/lib/docker/volumes/` (read with `sudo`).
- Published ports are reachable at `localhost` with no forwarding layer.
- Disk is limited to the 45 GB Ubuntu partition, so `docker system df` and `docker builder prune` matter.

## Commands reference

| Command | Purpose |
|---|---|
| `docker build -t transitsave:v1 .` | Build the image |
| `docker run -d --name transitsave -p 3000:80 transitsave:v1` | Run in background with port mapping |
| `docker ps` / `docker ps -a` | List running / all containers |
| `docker logs --tail 5 transitsave` | Show recent logs |
| `docker exec -it transitsave sh` | Open a shell inside the container |
| `docker stop transitsave && docker rm transitsave` | Stop and remove |
| `docker tag transitsave:v1 subashnagaraj/transitsave:v1` | Name the image for Docker Hub |
| `docker push subashnagaraj/transitsave:v1` | Upload to Docker Hub |
| `docker pull subashnagaraj/transitsave:v1` | Download from Docker Hub |
| `docker volume ls` / `docker volume inspect <name>` | Inspect volumes |
| `docker network create transitsave-net` | Create a custom bridge network |
| `docker compose up -d --build` | Build and start with Compose |
| `docker compose ps` / `logs -f` | Status / live logs |
| `docker compose down --volumes` | Stop and delete everything, including volumes |
| `docker system df` | Show disk usage |
| `docker builder prune` / `docker system prune` | Reclaim disk space |
| `make run` / `make stop` / `make up` / `make down` | Makefile shortcuts |
| `./docker-deploy.sh v1.0.0` | Build, run and verify with a version tag |

## Project files

`Dockerfile`, `Dockerfile.single` (comparison only), `nginx.conf`, `.dockerignore`, `docker-compose.yml`, `docker-deploy.sh`, `Makefile`, `DOCKER.md`

## What I learned

- Containers share the host kernel, so they are lighter than VMs (Day 23).
- Layer order decides build speed: put rarely-changing steps first (Day 25).
- Multi-stage builds cut the image from 993 MB to 99.2 MB (Day 26).
- Containers are disposable; volumes hold data that must survive (Day 27).
- Custom bridge networks give DNS by container name; the default bridge does not (Day 28).
- Healthchecks and restart policies make a container self-recovering.
- A script's exit code (0 or 1) is how automation knows success from failure.
