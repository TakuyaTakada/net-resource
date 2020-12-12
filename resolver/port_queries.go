package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type portResolver struct{ *Resolver }

func (r *queryResolver) GetPort(ctx context.Context, input genModels.GetIDInput) (*models.Port, error) {
	var port models.Port
	port.ID = input.ID
	if err := db.First(&port).Error; err != nil {
		return &port, err
	}
	return &port, nil
}
func (r *queryResolver) GetPorts(ctx context.Context, input genModels.SearchPortInput) ([]*models.Port, error) {
	var ports []*models.Port
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if input.DeviceID != nil {
		if *input.DeviceID == "" {
			tx = tx.Where("device_id IS NULL")
		} else {
			tx = tx.Where("device_id = ?", *input.DeviceID)
		}
	}
	if err := tx.Find(&ports).Error; err != nil {
		return ports, err
	}
	return ports, nil
}
func (r *portResolver) Device(ctx context.Context, obj *models.Port) (*models.Device, error) {
	return models.CtxLoaders(ctx).DeviceLoader.Load(obj.DeviceID)
}
