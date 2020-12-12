package testdata

import (
	"github.com/taktakty/netlabi/models"
)

var DeviceModelTestData = []models.DeviceModel{
	{
		Name:   "test name 1",
		Height: 1,
		Width:  100,
		Note:   "test note 1",
	},
	{
		Name:   "test name 2",
		Height: 2,
		Width:  100,
		Note:   "test note 2",
	},
	{
		Name:   "test name 3",
		Height: 3,
		Width:  80,
		Note:   "test note 3",
	},
	{
		Name:   "test name 4",
		Height: 4,
		Width:  90,
		Note:   "test note 4",
	},
	{
		Name:   "test name 5",
		Height: 5,
		Width:  100,
		Note:   "test note 5",
	},
	{
		Name:   "test name 6 for search",
		Height: 6,
		Width:  100,
		Note:   "test note 6",
	},
	{
		Name:   "test name 7 for search",
		Height: 7,
		Width:  100,
		Note:   "test note 7",
	},
	{
		Name:   "test name 8 for search",
		Height: 8,
		Width:  90,
		Note:   "test note 8",
	},
	{
		Name:   "test name 9 for device test",
		Height: 1,
		Width:  100,
		Note:   "test note 9",
	},
}

type DeviceModelParamStruct struct {
	Name   string
	Height int
	Width  int
	Note   string
}

type DeviceModelRespStruct struct {
	ID        string
	CreatedAt string
	UpdatedAt string
	DeletedAt *string
	Name      string
	Height    int
	Width     int
	Note      string
}

var DeviceModelResp = `{ id createdAt updatedAt deletedAt name height width note }`
