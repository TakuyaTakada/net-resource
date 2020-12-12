package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type hostResolver struct{ *Resolver }

func (r *queryResolver) GetHost(ctx context.Context, input genModels.GetIDInput) (*models.Host, error) {
	var host models.Host
	host.ID = input.ID
	if err := db.First(&host).Error; err != nil {
		return &host, err
	}
	return &host, nil
}
func (r *queryResolver) GetHosts(ctx context.Context, input genModels.SearchHostInput) ([]*models.Host, error) {
	var hosts []*models.Host
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if input.SiteID != nil && *input.SiteID != "" && input.RackID != nil && *input.RackID == "" {
		var racks []*models.Rack
		if err := db.Find(&racks, "site_id = ?", *input.SiteID).Error; err != nil {
			return hosts, nil
		}
		var rackIds []models.ID
		for _, r := range racks {
			rackIds = append(rackIds, r.ID)
		}
		var hostIds []models.ID
		var devices []*models.Device
		if err := db.Find(&devices, "rack_id IN (?)", rackIds).Error; err != nil {
			return hosts, nil
		}
		for _, r := range devices {
			hostIds = append(hostIds, r.HostID)
		}
		tx = tx.Where("id IN (?)", hostIds)
	}
	if input.RackID != nil && *input.RackID != "" {
		var devices []*models.Device
		if err := db.Find(&devices, "rack_id = ?", *input.RackID).Error; err != nil {
			return hosts, nil
		}
		var hostIds []models.ID
		for _, r := range devices {
			hostIds = append(hostIds, r.HostID)
		}
		tx = tx.Where("id IN (?)", hostIds)
	}
	if input.HostOSId != nil && *input.HostOSId != "" {
		tx = tx.Where("host_os_id = ?", *input.HostOSId)
	}
	if input.HostOSIsNull != nil && !*input.HostOSIsNull {
		tx = tx.Where("host_os_id IS NULL")
	}
	if input.HostOSIdOr != nil && *input.HostOSIdOr != "" {
		tx = tx.Or("host_os_id = ?", *input.HostOSIdOr)
	}
	if err := tx.Find(&hosts).Error; err != nil {
		return hosts, err
	}
	return hosts, nil
}
func (r *hostResolver) Devices(ctx context.Context, obj *models.Host) ([]*models.Device, error) {
	return models.CtxLoaders(ctx).DeviceByHostSliceLoader.Load(obj.ID)
}
func (r *hostResolver) MgmtIP(ctx context.Context, obj *models.Host) (*models.Ipaddr, error) {
	return models.CtxLoaders(ctx).IpaddrLoader.Load(obj.MgmtIPID)
}
func (r *hostResolver) HostOs(ctx context.Context, obj *models.Host) (*models.HostOS, error) {
	return models.CtxLoaders(ctx).HostOSLoader.Load(obj.HostOSID)
}
