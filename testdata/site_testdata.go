package testdata

import (
	"github.com/taktakty/netlabi/models"
)

var SiteTestData = []models.Site{
	{
		Name:        "test name 1",
		Status:      1,
		PostalCode:  "111-1111",
		PhoneNumber: "111-1111-1111",
		Address:     "test address 1",
		Note:        "test note 1",
	},
	{
		Name:        "test name 2",
		Status:      2,
		PostalCode:  "222-2222",
		PhoneNumber: "222-2222-2222",
		Address:     "test address 2",
		Note:        "test note 2",
	},
	{
		Name:        "test name 3",
		Status:      3,
		PostalCode:  "333-3333",
		PhoneNumber: "333-3333-3333",
		Address:     "test address 3",
		Note:        "test note 3",
	},
	{
		Name:        "test name 4",
		Status:      1,
		PostalCode:  "444-4444",
		PhoneNumber: "444-4444-4444",
		Address:     "test address 4",
		Note:        "test note 4",
	},
	{
		Name:        "test name 5",
		Status:      1,
		PostalCode:  "555-5555",
		PhoneNumber: "555-5555-5555",
		Address:     "test address 5",
		Note:        "test note 5",
	},
	{
		Name:        "test name 6 for search",
		Status:      1,
		PostalCode:  "666-6666",
		PhoneNumber: "666-6666-6666",
		Address:     "test address 6",
		Note:        "test note 6",
	},
	{
		Name:        "test name 7 for search",
		Status:      1,
		PostalCode:  "777-7777",
		PhoneNumber: "777-7777-7777",
		Address:     "test address 7",
		Note:        "test note 7",
	},
	{
		Name:        "test name 8 for search",
		Status:      1,
		PostalCode:  "888-8888",
		PhoneNumber: "888-8888-8888",
		Address:     "test address 8",
		Note:        "test note 8",
	},
}

type SiteParamStruct struct {
	Name        string
	Status      int
	PostalCode  string
	PhoneNumber string
	Address     string
	Note        string
}

type SiteRespStruct struct {
	ID          string
	CreatedAt   string
	UpdatedAt   string
	DeletedAt   *string
	Name        string
	Status      int
	PostalCode  string
	PhoneNumber string
	Address     string
	Note        string
}

var SiteResp = `{ id createdAt updatedAt deletedAt name status postalCode phoneNumber address note }`
