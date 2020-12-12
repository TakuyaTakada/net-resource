package models

// Device Definition of Device type
type (
	Device struct {
		Base
		Name          string `gorm:"size:100;unique;not null"`
		Status        int    `gorm:"not null"`
		Position      *int   `gorm:"unique_index:idx_position_rack"`
		RackID        ID     `gorm:"type:uuid;unique_index:idx_position_rack;default:null"`
		DeviceModelID ID     `gorm:"type:uuid;not null"`
		HostID        ID     `gorm:"type:uuid;default:null"`
		Ports         []Port `gorm:"ForeignKey:DeviceID"`
		Note          string `gorm:"size:1000"`
	}
)

// DeviceModel Definition of DeviceModel type
type (
	DeviceModel struct {
		Base
		Name   string   `gorm:"size:100;unique;not null"`
		Device []Device `gorm:"ForeignKey:DeviceModelID"`
		Height int      `gorm:"not null;default:1"`
		Width  int      `gorm:"not null;default:100"`
		Note   string   `gorm:"size:1000"`
	}
)

// Host Definition of Host type
type (
	Host struct {
		Base
		Name     string   `gorm:"size:100;unique;not null"`
		Status   int      `gorm:"not null"`
		Device   []Device `gorm:"ForeignKey:HostID"`
		HostOSID ID       `gorm:"type:uuid;default:null"`
		MgmtIPID ID       `gorm:"type:uuid;default:null"`
		MgmtIP   Ipaddr   `gorm:"ForeignKey:MgmtIPID"`
		Protocol int
		Note     string `gorm:"size:1000"`
	}
)

// HostOS Definition of HostOS type
type (
	HostOS struct {
		Base
		Name string `gorm:"size:100;unique;not null"`
		Host []Host `gorm:"ForeignKey:HostOSID"`
		Note string `gorm:"size:1000"`
	}
)
