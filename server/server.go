package main

import (
	"github.com/taktakty/netlabi/models"
	"log"
	"net/http"
	"os"

	"github.com/taktakty/netlabi/graph/generated"
	"github.com/taktakty/netlabi/resolver"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	defer resolver.CloseDB()
	db := resolver.GetDB()
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle(
		"/query",
		models.LoaderMiddleware(
			db,
			handler.NewDefaultServer(
				generated.NewExecutableSchema(
					generated.Config{Resolvers: &resolver.Resolver{}},
				),
			),
		),
	)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
