golangci-lint run ./...
CI=true go test -v -cover $(go list ./... | grep -v generated)
