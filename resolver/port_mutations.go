package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
	"strconv"
)

func (r *mutationResolver) CreatePort(ctx context.Context, input genModels.CreatePortInput) (*models.Port, error) {
	var port models.Port
	port.Name = input.Name
	port.Status = input.Status
	port.DeviceID = input.DeviceID
	if input.Note != nil && *input.Note != "" {
		port.Note = *input.Note
	}
	if err := db.Create(&port).Error; err != nil {
		return &port, err
	}
	return &port, nil
}
func (r *mutationResolver) BulkCreatePort(ctx context.Context, input genModels.BulkCreatePortInput) ([]*models.Port, error) {
	var ports []*models.Port
	for i := input.StartNum; i <= input.EndNum; i++ {
		var port models.Port
		port.Name = input.Prefix + strconv.Itoa(i)
		port.Status = input.Status
		port.DeviceID = input.DeviceID
		err := db.Create(&port).First(&port).Error
		if err != nil {
			return ports, err
		}
		ports = append(ports, &port)
	}
	return ports, nil
}
func (r *mutationResolver) UpdatePort(ctx context.Context, input genModels.UpdatePortInput) (*models.Port, error) {
	var port models.Port
	if input.Name != nil && *input.Name != "" {
		port.Name = *input.Name
	}
	if input.Status != nil && *input.Status != 0 {
		port.Status = *input.Status
	}
	if input.DeviceID != nil && *input.DeviceID != "" {
		port.DeviceID = *input.DeviceID
	}
	if input.Note != nil && *input.Note != "" {
		port.Note = *input.Note
	}
	err := db.Model(&port).Where("id = ?", input.ID).Updates(&port).First(&port).Error
	if err != nil {
		return &port, err
	}
	return &port, nil
}
func (r *mutationResolver) DeletePort(ctx context.Context, input genModels.GetIDInput) (*models.Port, error) {
	var port models.Port
	if err := db.Where("id = ?", input.ID).Delete(&port).Unscoped().First(&port).Error; err != nil {
		return &port, err
	}
	return &port, nil
}
func (r *mutationResolver) BulkDeletePort(ctx context.Context, input genModels.BulkIDInput) ([]*models.Port, error) {
	var ports []*models.Port
	if err := db.Where("id IN (?)", input.Ids).Delete(&ports).Unscoped().Find(&ports).Error; err != nil {
		return ports, err
	}
	return ports, nil
}
