package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateDeviceModel(ctx context.Context, input genModels.CreateDeviceModelInput) (*models.DeviceModel, error) {
	var deviceModel models.DeviceModel
	deviceModel.Name = input.Name
	deviceModel.Height = input.Height
	deviceModel.Width = input.Width
	if input.Note != nil && *input.Note != "" {
		deviceModel.Note = *input.Note
	}
	if err := db.Create(&deviceModel).Error; err != nil {
		return &deviceModel, err
	}
	return &deviceModel, nil
}
func (r *mutationResolver) UpdateDeviceModel(ctx context.Context, input genModels.UpdateDeviceModelInput) (*models.DeviceModel, error) {
	var deviceModel models.DeviceModel
	if input.Name != nil && *input.Name != "" {
		deviceModel.Name = *input.Name
	}
	if input.Height != nil && *input.Height != 0 {
		deviceModel.Height = *input.Height
	}
	if input.Width != nil && *input.Width != 0 {
		deviceModel.Width = *input.Width
	}
	if input.Note != nil && *input.Note != "" {
		deviceModel.Note = *input.Note
	}
	err := db.Model(&deviceModel).Where("id = ?", input.ID).Updates(&deviceModel).First(&deviceModel).Error
	if err != nil {
		return &deviceModel, err
	}
	return &deviceModel, nil
}
func (r *mutationResolver) DeleteDeviceModel(ctx context.Context, input genModels.GetIDInput) (*models.DeviceModel, error) {
	var deviceModel models.DeviceModel
	if err := db.Where("id = ?", input.ID).Delete(&deviceModel).Unscoped().First(&deviceModel).Error; err != nil {
		return &deviceModel, err
	}
	return &deviceModel, nil
}
func (r *mutationResolver) BulkDeleteDeviceModel(ctx context.Context, input genModels.BulkIDInput) ([]*models.DeviceModel, error) {
	var deviceModels []*models.DeviceModel
	if err := db.Where("id IN (?)", input.Ids).Delete(&deviceModels).Unscoped().Find(&deviceModels).Error; err != nil {
		return deviceModels, err
	}
	return deviceModels, nil
}
