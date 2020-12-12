package config

import (
	"github.com/kelseyhightower/envconfig"
)

type dbParams struct {
	Host     string `envconfig:"DB_HOST" default:"127.0.0.1"`
	Port     string `envconfig:"DB_PORT" default:"5432"`
	User     string `envconfig:"DB_USER" default:"netlabi"`
	DbName   string `envconfig:"DB_NAME" default:"netlabi"`
	Password string `envconfig:"DB_PASSWORD" default:"netlabi"`
	SslMode  string `envconfig:"DB_SSL_MODE" default:"disable"`
}

type testDBParams struct {
	Host     string `envconfig:"DB_HOST" default:"127.0.0.1"`
	Port     string `envconfig:"DB_PORT" default:"5433"`
	User     string `envconfig:"DB_USER" default:"netlabi_test"`
	DbName   string `envconfig:"DB_NAME" default:"netlabi_test"`
	Password string `envconfig:"DB_PASSWORD" default:"netlabi_test"`
	SslMode  string `envconfig:"DB_SSL_MODE" default:"disable"`
}

// GenDBParam returns gorm config
func GenDBParam() string {
	p := dbParams{}
	// nolint
	envconfig.Process("", &p)
	return "host=" + p.Host + " port=" + p.Port + " user=" + p.User + " dbname=" + p.DbName + " password=" + p.Password + " sslmode=" + p.SslMode
}

func GenTestDBParam() string {
	p := testDBParams{}
	// nolint
	envconfig.Process("", &p)
	if GetCircleCI() {
		p.Port = "5432"
	}
	return "host=" + p.Host + " port=" + p.Port + " user=" + p.User + " dbname=" + p.DbName + " password=" + p.Password + " sslmode=" + p.SslMode
}
