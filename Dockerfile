FROM golang:1.13.5 AS builder
ARG name
ARG repository
WORKDIR /go/src/${repository}/${name}
COPY go.mod go.mod
COPY Makefile Makefile
RUN make get
COPY . .
RUN make build

FROM alpine
ARG name
ARG repository
ARG binary_path
WORKDIR /root/
COPY --from=builder /go/src/${repository}/${name}/${binary_path} ./app
EXPOSE 8080
ENTRYPOINT ["./app"]