package cmd

import (
	"github.com/taktakty/netlabi/models"
)

func Migrate() {
	db := Connect()
	defer db.Close()
	db.AutoMigrate(models.Site{})
	db.AutoMigrate(models.Device{}, models.DeviceModel{}, models.Host{}, models.HostOS{})
	db.AutoMigrate(models.Ipaddr{}, models.IpSegment{}, models.Vrf{}, models.SegmentUse{})
	db.AutoMigrate(models.Port{}).AddForeignKey("device_id", "devices(id)", "CASCADE", "CASCADE")
	db.AutoMigrate(models.Rack{}).AddForeignKey("site_id", "sites(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.Device{}).AddForeignKey("rack_id", "racks(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.Device{}).AddForeignKey("device_model_id", "device_models(id)", "CASCADE", "CASCADE")
	db.AutoMigrate(models.Device{}).AddForeignKey("host_id", "hosts(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.Host{}).AddForeignKey("host_os_id", "host_os(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.Host{}).AddForeignKey("mgmt_ip_id", "ipaddrs(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.Ipaddr{}).AddForeignKey("ip_segment_id", "ip_segments(id)", "CASCADE", "CASCADE")
	db.AutoMigrate(models.IpSegment{}).AddForeignKey("vrf_id", "vrves(id)", "SET NULL", "SET NULL")
	db.AutoMigrate(models.IpSegment{}).AddForeignKey("segment_use_id", "segment_uses(id)", "SET NULL", "SET NULL")
}
