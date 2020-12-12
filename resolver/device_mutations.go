package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
	"github.com/jinzhu/gorm"
)

func (r *mutationResolver) CreateDevice(ctx context.Context, input genModels.CreateDeviceInput) (*models.Device, error) {
	var device models.Device
	device.Name = input.Name
	device.Status = input.Status
	device.DeviceModelID = input.DeviceModelID
	if input.Position != nil && *input.Position != 0 {
		device.Position = input.Position
	}
	if input.RackID != nil && *input.RackID != "" {
		device.RackID = *input.RackID
	}
	if input.HostID != nil && *input.HostID != "" {
		device.HostID = *input.HostID
	}
	if input.Note != nil && *input.Note != "" {
		device.Note = *input.Note
	}
	if err := db.Create(&device).Error; err != nil {
		return &device, err
	}
	return &device, nil
}
func (r *mutationResolver) UpdateDevice(ctx context.Context, input genModels.UpdateDeviceInput) (*models.Device, error) {
	var device models.Device
	if input.Name != nil && *input.Name != "" {
		device.Name = *input.Name
	}
	if input.Status != nil && *input.Status != 0 {
		device.Status = *input.Status
	}
	if input.Position != nil && *input.Position != 0 {
		device.Position = input.Position
	}
	if input.DeviceModelID != nil && *input.DeviceModelID != "" {
		device.DeviceModelID = *input.DeviceModelID
	}
	if input.RackID != nil && *input.RackID != "" {
		device.RackID = *input.RackID
	}
	if input.HostID != nil && *input.HostID != "" {
		device.HostID = *input.HostID
	}
	if input.Note != nil && *input.Note != "" {
		device.Note = *input.Note
	}
	err := db.Model(&device).Where("id = ?", input.ID).Updates(&device).First(&device).Error
	if err != nil {
		return &device, err
	}
	return &device, nil
}
func (r *mutationResolver) BulkUpdateDevice(ctx context.Context, input genModels.BulkUpdateDeviceInput) ([]*models.Device, error) {
	var devices []*models.Device
	var devIds []models.ID
	for _, dev := range input.Devices {
		devIds = append(devIds, dev.ID)
	}
	if err := db.Model(&models.Device{}).Where("id IN (?)", devIds).Update("position", gorm.Expr("NULL")).Error; err != nil {
		return devices, err
	}
	for _, dev := range input.Devices {
		device := map[string]interface{}{}
		var resp models.Device
		if dev.Name != nil && *dev.Name != "" {
			device["name"] = *dev.Name
		}
		if dev.Status != nil && *dev.Status != 0 {
			device["status"] = *dev.Status
		}
		if dev.Position != nil {
			if *dev.Position == 0 {
				device["position"] = gorm.Expr("NULL")
			} else {
				device["position"] = dev.Position
			}
		}
		if dev.DeviceModelID != nil && *dev.DeviceModelID != "" {
			device["device_model_id"] = *dev.DeviceModelID
		}
		if dev.RackID != nil {
			if *dev.RackID == "" {
				device["rack_id"] = gorm.Expr("NULL")
			} else {
				device["rack_id"] = *dev.RackID
			}
		}
		if dev.HostID != nil {
			if *dev.HostID == "" {
				device["host_id"] = gorm.Expr("NULL")
			} else {
				device["host_id"] = *dev.HostID
			}
		}
		if dev.Note != nil {
			if *dev.Note == "" {
				device["note"] = gorm.Expr("NULL")
			} else {
				device["note"] = *dev.Note
			}
		}
		err := db.Model(&resp).Where("id = ?", dev.ID).Updates(device).First(&resp).Error
		if err != nil {
			return devices, err
		}
		devices = append(devices, &resp)
	}
	return devices, nil
}
func (r *mutationResolver) DeleteDevice(ctx context.Context, input genModels.GetIDInput) (*models.Device, error) {
	var device models.Device
	if err := db.Where("id = ?", input.ID).Delete(&device).Unscoped().First(&device).Error; err != nil {
		return &device, err
	}
	return &device, nil
}
func (r *mutationResolver) BulkDeleteDevice(ctx context.Context, input genModels.BulkIDInput) ([]*models.Device, error) {
	var devices []*models.Device
	if err := db.Where("id IN (?)", input.Ids).Delete(&devices).Unscoped().Find(&devices).Error; err != nil {
		return devices, err
	}
	return devices, nil
}
