package models

//Site Definition of Site type
type (
	Site struct {
		Base
		Name        string `gorm:"size:100;unique;not null"`
		Status      int    `gorm:"not null"`
		PostalCode  string `gorm:"size:20"`
		PhoneNumber string `gorm:"size:20"`
		Address     string `gorm:"size:200"`
		Note        string `gorm:"size:1000"`
		Rack        []Rack `gorm:"ForeignKey:SiteID"`
	}
)
