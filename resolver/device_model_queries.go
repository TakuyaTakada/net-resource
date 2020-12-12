package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type deviceModelResolver struct{ *Resolver }

func (r *queryResolver) GetDeviceModel(ctx context.Context, input genModels.GetIDInput) (*models.DeviceModel, error) {
	var deviceModel models.DeviceModel
	deviceModel.ID = input.ID
	if err := db.First(&deviceModel).Error; err != nil {
		return &deviceModel, err
	}
	return &deviceModel, nil
}
func (r *queryResolver) GetDeviceModels(ctx context.Context, input genModels.SearchDeviceModelInput) ([]*models.DeviceModel, error) {
	var deviceModel []*models.DeviceModel
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if err := tx.Find(&deviceModel).Error; err != nil {
		return deviceModel, err
	}
	return deviceModel, nil
}
func (r *deviceModelResolver) Devices(ctx context.Context, obj *models.DeviceModel) ([]*models.Device, error) {
	return models.CtxLoaders(ctx).DeviceByModelSliceLoader.Load(obj.ID)
}
