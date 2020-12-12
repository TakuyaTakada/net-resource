package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateHost(ctx context.Context, input genModels.CreateHostInput) (*models.Host, error) {
	var host models.Host
	host.Name = input.Name
	host.Status = input.Status
	if input.DeviceIds != nil && len(input.DeviceIds) != 0 {
		var devices []models.Device
		if err := db.Where("id IN (?)", input.DeviceIds).Find(&devices).Error; err != nil {
			return &host, err
		}
		host.Device = devices
	}
	if input.MgmtIPID != nil && *input.MgmtIPID != "" {
		var ipaddr models.Ipaddr
		ipaddr.ID = models.ID(*input.MgmtIPID)
		if err := db.First(&ipaddr).Error; err != nil {
			return &host, err
		}
		host.MgmtIP = ipaddr
		host.MgmtIP.Status = 3
		host.MgmtIPID = ipaddr.ID
	}
	if input.HostOSId != nil && *input.HostOSId != "" {
		host.HostOSID = models.ID(*input.HostOSId)
	}
	if input.Protocol != nil && *input.Protocol != 0 {
		host.Protocol = *input.Protocol
	}
	if input.Note != nil && *input.Note != "" {
		host.Note = *input.Note
	}
	if err := db.Create(&host).Error; err != nil {
		return &host, err
	}
	return &host, nil
}
func (r *mutationResolver) UpdateHost(ctx context.Context, input genModels.UpdateHostInput) (*models.Host, error) {
	var host models.Host
	if input.Name != nil && *input.Name != "" {
		host.Name = *input.Name
	}
	if input.Status != nil && *input.Status != 0 {
		host.Status = *input.Status
	}
	if input.DeviceIds != nil && len(input.DeviceIds) != 0 {
		var devices []models.Device
		if err := db.Where("id IN (?)", input.DeviceIds).Find(&devices).Error; err != nil {
			return &host, err
		}
		host.Device = devices
	}
	if input.MgmtIPID != nil && *input.MgmtIPID != "" {
		var ipaddr models.Ipaddr
		ipaddr.ID = models.ID(*input.MgmtIPID)
		if err := db.First(&ipaddr).Error; err != nil {
			return &host, err
		}
		host.MgmtIP = ipaddr
		host.MgmtIP.Status = 3
		host.MgmtIPID = ipaddr.ID
	}
	if input.HostOSId != nil && *input.HostOSId != "" {
		host.HostOSID = models.ID(*input.HostOSId)
	}
	if input.Protocol != nil && *input.Protocol != 0 {
		host.Protocol = *input.Protocol
	}
	if input.Note != nil && *input.Note != "" {
		host.Note = *input.Note
	}
	err := db.Model(&host).Where("id = ?", input.ID).Updates(&host).First(&host).Error
	if err != nil {
		return &host, err
	}
	return &host, nil
}
func (r *mutationResolver) DeleteHost(ctx context.Context, input genModels.GetIDInput) (*models.Host, error) {
	var host models.Host
	if err := db.Where("id = ?", input.ID).Delete(&host).Unscoped().First(&host).Error; err != nil {
		return &host, err
	}
	return &host, nil
}
func (r *mutationResolver) BulkDeleteHost(ctx context.Context, input genModels.BulkIDInput) ([]*models.Host, error) {
	var hosts []*models.Host
	if err := db.Where("id IN (?)", input.Ids).Delete(&hosts).Unscoped().Find(&hosts).Error; err != nil {
		return hosts, err
	}
	return hosts, nil
}
