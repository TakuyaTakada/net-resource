package testdata

import (
	"github.com/taktakty/netlabi/models"
)

var IpSegmentTestData = []models.IpSegment{
	{
		IPSegment: "192.168.1.0/28",
		Note:      "test note 1",
	},
	{
		IPSegment: "192.168.1.0/28",
		Note:      "test note 2",
	},
	{
		IPSegment: "192.168.1.0/28",
		Note:      "test note 3",
	},
	{
		IPSegment: "192.168.1.0/28",
		Note:      "test note 4",
	},
	{
		IPSegment: "192.168.1.0/28",
		Note:      "test note 5",
	},
	{
		IPSegment: "172.16.1.0/28",
		Note:      "test note 6",
	},
	{
		IPSegment: "172.16.1.16/28",
		Note:      "test note 7",
	},
	{
		IPSegment: "172.16.1.32/28",
		Note:      "test note 8",
	},
}

type IpSegmentParamStruct struct {
	IPSegment string
	Note      string
}

type IpSegmentRespStruct struct {
	ID        string
	CreatedAt string
	UpdatedAt string
	DeletedAt *string
	IPSegment string
	Note      string
}

var IpSegmentResp = `{ id createdAt updatedAt deletedAt ipSegment note }`
