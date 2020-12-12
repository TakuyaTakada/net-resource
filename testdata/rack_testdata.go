package testdata

import (
	"github.com/taktakty/netlabi/models"
)

var RackTestData = []models.Rack{
	{
		Name:   "test name 1",
		Status: 1,
		Units:  42,
		Note:   "test note 1",
	},
	{
		Name:   "test name 2",
		Status: 2,
		Units:  42,
		Note:   "test note 2",
	},
	{
		Name:   "test name 3",
		Status: 3,
		Units:  42,
		Note:   "test note 3",
	},
	{
		Name:   "test name 4",
		Status: 1,
		Units:  42,
		Note:   "test note 4",
	},
	{
		Name:   "test name 5",
		Status: 1,
		Units:  42,
		Note:   "test note 5",
	},
	{
		Name:   "test name 6 for search",
		Status: 1,
		Units:  42,
		Note:   "test note 6",
	},
	{
		Name:   "test name 7 for search",
		Status: 1,
		Units:  42,
		Note:   "test note 7",
	},
	{
		Name:   "test name 8 for search",
		Status: 1,
		Units:  42,
		Note:   "test note 8",
	},
}

type RackParamStruct struct {
	Name   string
	Status int
	Units  int
	Note   string
}

type RackRespStruct struct {
	ID        string
	CreatedAt string
	UpdatedAt string
	DeletedAt *string
	Name      string
	Status    int
	Units     int
	Note      string
}

var RackResp = `{ id createdAt updatedAt deletedAt name status units note }`
