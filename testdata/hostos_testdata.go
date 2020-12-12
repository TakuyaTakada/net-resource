package testdata

import (
	"github.com/taktakty/netlabi/models"
)

var HostOSTestData = []models.HostOS{
	{
		Name: "test name 1",
		Note: "test note 1",
	},
	{
		Name: "test name 2",
		Note: "test note 2",
	},
	{
		Name: "test name 3",
		Note: "test note 3",
	},
	{
		Name: "test name 4",
		Note: "test note 4",
	},
	{
		Name: "test name 5",
		Note: "test note 5",
	},
	{
		Name: "test name 6 for search",
		Note: "test note 6",
	},
	{
		Name: "test name 7 for search",
		Note: "test note 7",
	},
	{
		Name: "test name 8 for search",
		Note: "test note 8",
	},
}

type HostOSParamStruct struct {
	Name     string
	Status   int
	Protocol int
	Note     string
}

type HostOSRespStruct struct {
	ID        string
	CreatedAt string
	UpdatedAt string
	DeletedAt *string
	Name      string
	Note      string
}

var HostOSResp = `{ id createdAt updatedAt deletedAt name note }`
