package models

//Rack Definition of Rack type
type (
	Rack struct {
		Base
		Name   string   `gorm:"size:100;unique_index:idx_name_site;not null"`
		Status int      `gorm:"not null"`
		SiteID ID       `gorm:"type:uuid;unique_index:idx_name_site;default:null"`
		Units  int      `gorm:"not null"`
		Device []Device `gorm:"ForeignKey:RackID"`
		Note   string   `gorm:"size:1000"`
	}
)
