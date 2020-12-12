package config

import (
	"github.com/kelseyhightower/envconfig"
)

type commonParams struct {
	Debug    bool `envconfig:"DEBUG" default:"true"`
	CI       bool `envconfig:"CI" default:"false"`
	CircleCI bool `envconfig:"CIRCLECI" default:"false"`
}

var p = commonParams{}

// nolint
// GetDebug returns $DEBUG
func GetDebug() bool {
	envconfig.Process("", &p)
	return p.Debug
}

// nolint
// GetCI returns $CI
func GetCI() bool {
	envconfig.Process("", &p)
	return p.CI
}

// nolint
func GetCircleCI() bool {
	envconfig.Process("", &p)
	return p.CircleCI
}
