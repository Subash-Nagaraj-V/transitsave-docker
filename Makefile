.RECIPEPREFIX = >
IMAGE := transitsave
VERSION ?= v1
NAME := transitsave

.PHONY: help build run stop logs size disk up down deploy clean

help:
> @echo "make build   - build the image"
> @echo "make run     - build and run one container on port 3000"
> @echo "make stop    - stop and remove that container"
> @echo "make logs    - follow container logs"
> @echo "make size    - show image sizes"
> @echo "make disk    - show Docker disk usage"
> @echo "make up      - start with docker compose"
> @echo "make down    - stop docker compose"
> @echo "make deploy  - run docker-deploy.sh"
> @echo "make clean   - remove everything incl. volumes"

build:
> docker build -t $(IMAGE):$(VERSION) .

run: build
> -docker rm -f $(NAME)
> docker run -d --name $(NAME) -p 3000:80 $(IMAGE):$(VERSION)

stop:
> -docker rm -f $(NAME)

logs:
> docker logs -f $(NAME)

size:
> docker images $(IMAGE)

disk:
> docker system df

up:
> docker compose up -d --build

down:
> docker compose down

deploy:
> ./docker-deploy.sh $(VERSION)

clean:
> -docker compose down --volumes
> -docker rm -f $(NAME)
