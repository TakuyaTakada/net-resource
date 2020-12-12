package models

type (
	Port struct {
		Base
		Name     string `gorm:"size:50;not null;unique_index:idx_name_device"`
		Status   int    `gorm:"not null"`
		DeviceID ID     `gorm:"type:uuid;unique_index:idx_name_device;not null"`
		Note     string `gorm:"size:1000"`
	}
)
