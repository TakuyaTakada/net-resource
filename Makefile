REPOSITORY ?= github.com/taktakty
NAME ?= netlabi
TAG ?= latest
SERVER_NAME ?= localhost

GOCMD := go
GOBUILD := $(GOCMD) build
GOCLEAN := $(GOCMD) clean
GOTEST := $(GOCMD) test
GOGET := $(GOCMD) get
BINARY_NAME := $(NAME)
BUILD_DIR := build
BINARY_PATH := $(BUILD_DIR)/$(BINARY_NAME)

# Docker
DOCKER_REPO ?= netlabi
DOCKER_BACKEND_IMAGE_NAME := $(DOCKER_REPO)/backend:$(TAG)
DOCKER_FRONTEND_IMAGE_NAME := $(DOCKER_REPO)/frontend:$(TAG)
DOCKER_CYPRESS_IMAGE_NAME := $(DOCKER_REPO)/cypress:$(TAG)
DOCKER_E2E_DB_IMAGE_NAME := $(DOCKER_REPO)/e2e-db:$(TAG)
DOCKER_BUILD_ARGS := --build-arg name=$(NAME) --build-arg repository=$(REPOSITORY) --build-arg binary_path=$(BINARY_PATH)
DOCKER_BACKEND_BUILD_OPTS := $(DOCKER_BUILD_ARGS) --cache-from $(DOCKER_BACKEND_IMAGE_NAME) -t $(DOCKER_BACKEND_IMAGE_NAME)
DOCKER_FRONTEND_BUILD_OPTS := --build-arg server_name=$(SERVER_NAME) --cache-from $(DOCKER_FRONTEND_IMAGE_NAME) -t $(DOCKER_FRONTEND_IMAGE_NAME)
DOCKER_CYPRESS_BUILD_OPTS := --cache-from $(DOCKER_CYPRESS_IMAGE_NAME) -t $(DOCKER_CYPRESS_IMAGE_NAME)
DOCKER_E2E_DB_BUILD_OPTS := --cache-from $(DOCKER_E2E_DB_IMAGE_NAME) -t $(DOCKER_E2E_DB_IMAGE_NAME)

all: get build

mkdir:
	mkdir ./$(BUILD_DIR)

.PHONY: build
build: mkdir
	CGO_ENABLED=0 $(GOBUILD) -o ./$(BINARY_PATH) -v ./server

.PHONY: test
test:
	golangci-lint run ./...
	CI=true $(GOTEST) -v -cover ./resolver

clean:
	$(GOCLEAN)
	rm -f ./$(BINARY_PATH)

run: build
	./$(BINARY_PATH)

get:
	$(GOGET) -v -t -d ./...

docker-build: docker-build-backend docker-build-frontend docker-build-e2e-db docker-build-cypress

docker-build-backend:
	docker build $(DOCKER_BACKEND_BUILD_OPTS) .

docker-build-frontend:
	docker build $(DOCKER_FRONTEND_BUILD_OPTS) ./frontend

docker-build-cypress:
	docker build $(DOCKER_CYPRESS_BUILD_OPTS) ./e2e

docker-build-e2e-db:
	docker build $(DOCKER_E2E_DB_BUILD_OPTS) ./scripts

docker-push: docker-push-backend docker-push-frontend docker-push-e2e-db docker-push-cypress

docker-push-backend:
	docker push $(DOCKER_BACKEND_IMAGE_NAME)

docker-push-frontend:
	docker push $(DOCKER_FRONTEND_IMAGE_NAME)

docker-push-cypress:
	docker push $(DOCKER_CYPRESS_IMAGE_NAME)

docker-push-e2e-db:
	docker push $(DOCKER_E2E_DB_IMAGE_NAME)

docker-pull: docker-pull-backend docker-pull-frontend docker-pull-e2e-db docker-pull-cypress

docker-pull-backend:
	docker pull $(DOCKER_BACKEND_IMAGE_NAME)

docker-pull-frontend:
	docker pull $(DOCKER_FRONTEND_IMAGE_NAME)

docker-pull-cypress:
	docker pull $(DOCKER_CYPRESS_IMAGE_NAME)

docker-pull-e2e-db:
	docker pull $(DOCKER_E2E_DB_IMAGE_NAME)

dc-up-test-local:
	docker-compose -f docker-compose.test.yml up -d --force-recreate database backend frontend

dc-down-test:
	docker-compose -f docker-compose.test.yml down

cypress-run:
	cd ./e2e && yarn test

report-slack:
	cd ./e2e && yarn slack:ci

e2e-local: dc-up-test-local cypress-run

dc-e2e:
	docker-compose -f docker-compose.test.yml up --exit-code-from cypress --force-recreate --abort-on-container-exit

dc-e2e-glab:
	docker-compose -f docker-compose.test.gitlab.yml up --exit-code-from cypress --force-recreate --abort-on-container-exit

fetch-reports:
	docker cp netlabi_cypress_1:/opt/cypress/reports ./e2e/cypress/reports
	docker cp netlabi_cypress_1:/opt/mochawesome-report ./e2e/mochawesome-report

fetch-videos:
	docker cp netlabi_cypress_1:/opt/cypress/videos ./e2e/cypress/videos

fetch-screenshots:
	docker cp netlabi_cypress_1:/opt/cypress/screenshots ./e2e/cypress/screenshots

fetch-results: fetch-reports fetch-videos fetch-screenshots