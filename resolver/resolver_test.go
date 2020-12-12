package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"os"
	"testing"

	"github.com/taktakty/netlabi/cmd"

	"github.com/taktakty/netlabi/graph/generated"
	"github.com/taktakty/netlabi/models"

	// Sqlite3 driver
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var c *client.Client
var siteTestData []models.Site
var rackTestData []models.Rack
var deviceModelTestData []models.DeviceModel
var deviceTestData []models.Device
var hostTestData []models.Host
var hostosTestData []models.HostOS
var ipSegmentTestData []models.IpSegment
var vrfTestData []models.Vrf
var segmentUseTestData []models.SegmentUse
var portTestData []models.Port

func createSiteTestData() []models.Site {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Site{})
	testData := testdata.SiteTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test site")
		}
		testData[id] = td
	}
	return testData
}

func createRackTestData() []models.Rack {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Rack{})
	testData := testdata.RackTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test rack")
		}
		testData[id] = td
	}
	return testData
}

func createDeviceModelTestData() []models.DeviceModel {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.DeviceModel{})
	testData := testdata.DeviceModelTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test device model")
		}
		testData[id] = td
	}
	return testData
}

func createDeviceTestData() []models.Device {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Device{})
	testData := testdata.DeviceTestData
	for id, td := range testData {
		td.DeviceModelID = deviceModelTestData[8].ID
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test device")
		}
		testData[id] = td
	}
	return testData
}

func createHostTestData() []models.Host {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Host{})
	testData := testdata.HostTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test host")
		}
		testData[id] = td
	}
	return testData
}

func createHostOSTestData() []models.HostOS {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.HostOS{})
	testData := testdata.HostOSTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test hostOS")
		}
		testData[id] = td
	}
	return testData
}

func createIpSegmentTestData() []models.IpSegment {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Ipaddr{})
	db.Unscoped().Delete(&models.IpSegment{})
	testData := testdata.IpSegmentTestData
	for id, td := range testData {
		if ips, err := resolveIps(string(td.IPSegment)); err != nil {
			panic("cannot resolve ips")
		} else {
			for idx, ip := range ips {
				var ipaddr models.Ipaddr
				if idx == 0 {
					ipaddr.Type = 1 // NW Address
					ipaddr.Status = 2
				} else if idx == len(ips)-1 {
					ipaddr.Type = 2 // Broadcast Address
					ipaddr.Status = 2
				} else {
					ipaddr.Type = 3 // Host Address
					ipaddr.Status = 1
				}
				ipaddr.IP = models.IP(ip)
				td.Ipaddr = append(td.Ipaddr, ipaddr)
			}
		}
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test IpSegment")
		}
		testData[id] = td
	}
	return testData
}

func createVrfTestData() []models.Vrf {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Vrf{})
	testData := testdata.VrfTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test vrf")
		}
		testData[id] = td
	}
	return testData
}

func createSegmentUseTestData() []models.SegmentUse {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.SegmentUse{})
	testData := testdata.SegmentUseTestData
	for id, td := range testData {
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test vrf")
		}
		testData[id] = td
	}
	return testData
}

func createPortTestData() []models.Port {
	db := cmd.GetInstance()
	db.Unscoped().Delete(&models.Port{})
	testData := testdata.PortTestData
	for id, td := range testData {
		td.DeviceID = deviceTestData[8].ID
		if err := db.Create(&td).Find(&td).Error; err != nil {
			panic("failed create test port")
		}
		testData[id] = td
	}
	return testData
}

func setup() {
	c = client.New(handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &Resolver{}})))
	siteTestData = createSiteTestData()
	rackTestData = createRackTestData()
	deviceModelTestData = createDeviceModelTestData()
	deviceTestData = createDeviceTestData()
	hostTestData = createHostTestData()
	hostosTestData = createHostOSTestData()
	ipSegmentTestData = createIpSegmentTestData()
	vrfTestData = createVrfTestData()
	segmentUseTestData = createSegmentUseTestData()
	portTestData = createPortTestData()
}

func teardown() {
	db.Close()
}

func TestMain(m *testing.M) {
	setup()
	m.Run()
	teardown()
	os.Exit(0)
}
