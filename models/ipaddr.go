package models

import (
	"fmt"
	"io"
	"strconv"
)

// Ipaddr Definition of Ipaddr type
type (
	Ipaddr struct {
		Base
		IP          IP     `gorm:"type:inet;unique_index:idx_ip_segment;not null"`
		Status      int    `gorm:"not null"`
		Type        int    `gorm:"not null"`
		IPSegmentID ID     `gorm:"type:uuid;unique_index:idx_ip_segment;not null"`
		Note        string `gorm:"size:1000"`
	}
)

// IpSegment Definition of IpSegment type golint:ignore
type (
	IpSegment struct {
		Base
		IPSegment    IPSeg    `gorm:"type:cidr;unique_index:idx_segment_vrf;not null"`
		VrfID        ID       `gorm:"type:uuid;unique_index:idx_segment_vrf;default:null"`
		Ipaddr       []Ipaddr `gorm:"ForeignKey:IpSegmentID"`
		SegmentUseID ID       `gorm:"type:uuid;default:null"`
		Note         string   `gorm:"size:1000"`
	}
)

type (
	Vrf struct {
		Base
		Name      string      `gorm:"size:100;unique;not null"`
		IpSegment []IpSegment `gorm:"ForeignKey:VrfID"`
		Note      string      `gorm:"size:1000"`
	}
)

type (
	SegmentUse struct {
		Base
		Name      string      `gorm:"size:100;unique;not null"`
		IpSegment []IpSegment `gorm:"ForeignKey:SegmentUseID"`
		Note      string      `gorm:"size:1000"`
	}
)

// IP net.IP
type IP string

// MarshalGQL for IP
func (ip IP) MarshalGQL(w io.Writer) {
	str := strconv.Quote(string(ip))
	fmt.Fprint(w, str)
}

// UnmarshalGQL for IP
func (ip *IP) UnmarshalGQL(v interface{}) error {
	parsed, ok := v.(string)
	if !ok {
		return fmt.Errorf("ip must be string")
	}
	*ip = IP(parsed)
	return nil
}

// IPSeg net.IPNet
type IPSeg string

// MarshalGQL for IPSeg
func (ips IPSeg) MarshalGQL(w io.Writer) {
	str := strconv.Quote(string(ips))
	fmt.Fprint(w, str)
}

// UnmarshalGQL for IPSeg
func (ips *IPSeg) UnmarshalGQL(v interface{}) error {
	parsed, ok := v.(string)
	if !ok {
		return fmt.Errorf("ipseg must be string")
	}
	*ips = IPSeg(parsed)
	return nil
}
