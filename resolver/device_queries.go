package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type deviceResolver struct{ *Resolver }

func (r *queryResolver) GetDevice(ctx context.Context, input genModels.GetIDInput) (*models.Device, error) {
	var device models.Device
	device.ID = input.ID
	if err := db.First(&device).Error; err != nil {
		return &device, err
	}
	return &device, nil
}
func (r *queryResolver) GetDevices(ctx context.Context, input genModels.SearchDeviceInput) ([]*models.Device, error) {
	var devices []*models.Device
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if input.SiteID != nil && *input.SiteID != "" {
		var racks []*models.Rack
		if err := db.Select("id").Find(&racks, "site_id = ?", *input.SiteID).Error; err != nil {
			return devices, nil
		}
		var rackIds []models.ID
		for _, r := range racks {
			rackIds = append(rackIds, r.ID)
		}
		tx = tx.Where("rack_id IN (?)", rackIds)
	}
	if input.RackID != nil {
		if *input.RackID == "" {
			tx = tx.Where("rack_id IS NULL")
		} else {
			tx = tx.Where("rack_id = ?", *input.RackID)
		}
	}
	if input.RackIDOrNull != nil && *input.RackIDOrNull != "" {
		tx = tx.Or("rack_id IS NULL")
		tx = tx.Where("rack_id = ?", *input.RackIDOrNull)
	}
	if input.DeviceModelID != nil && *input.DeviceModelID != "" {
		tx = tx.Where("device_model_id = ?", *input.DeviceModelID)
	}
	if input.HostID != nil && *input.HostID != "" && (input.HostIDOr == nil || (input.HostIDOr != nil && *input.HostIDOr == "")) {
		tx = tx.Where("host_id = ?", *input.HostID)
	}
	if input.HostIDOr != nil && *input.HostIDOr != "" {
		tx = tx.Or("host_id = ?", *input.HostIDOr)
	}
	if input.HostIDIsNull != nil && *input.HostIDIsNull {
		tx = tx.Where("host_id IS NULL")
	}
	if input.PositionIsNull != nil && *input.PositionIsNull {
		tx = tx.Where("position IS NULL")
	}
	if err := tx.Find(&devices).Error; err != nil {
		return devices, err
	}
	return devices, nil
}
func (r *deviceResolver) Rack(ctx context.Context, obj *models.Device) (*models.Rack, error) {
	return models.CtxLoaders(ctx).RackLoader.Load(obj.RackID)
}
func (r *deviceResolver) DeviceModel(ctx context.Context, obj *models.Device) (*models.DeviceModel, error) {
	return models.CtxLoaders(ctx).DeviceModelLoader.Load(obj.DeviceModelID)
}
func (r *deviceResolver) Host(ctx context.Context, obj *models.Device) (*models.Host, error) {
	return models.CtxLoaders(ctx).HostLoader.Load(obj.HostID)
}
func (r *deviceResolver) Ports(ctx context.Context, obj *models.Device) ([]*models.Port, error) {
	return models.CtxLoaders(ctx).PortByDeviceSliceLoader.Load(obj.ID)
}
