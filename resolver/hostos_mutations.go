package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateHostOs(ctx context.Context, input genModels.CreateHostOSInput) (*models.HostOS, error) {
	var hostos models.HostOS
	hostos.Name = input.Name
	if input.HostIds != nil && len(input.HostIds) != 0 {
		var hosts []models.Host
		if err := db.Where("id IN (?)", input.HostIds).Find(&hosts).Error; err != nil {
			return &hostos, err
		}
		hostos.Host = hosts
	}
	if input.Note != nil && *input.Note != "" {
		hostos.Note = *input.Note
	}
	if err := db.Create(&hostos).Error; err != nil {
		return &hostos, err
	}
	return &hostos, nil
}
func (r *mutationResolver) UpdateHostOs(ctx context.Context, input genModels.UpdateHostOSInput) (*models.HostOS, error) {
	var hostos models.HostOS
	if input.Name != nil && *input.Name != "" {
		hostos.Name = *input.Name
	}
	if input.HostIds != nil && len(input.HostIds) != 0 {
		var hosts []models.Host
		if err := db.Where("id IN (?)", input.HostIds).Find(&hosts).Error; err != nil {
			return &hostos, err
		}
		hostos.Host = hosts
	}
	if input.Note != nil && *input.Note != "" {
		hostos.Note = *input.Note
	}
	err := db.Model(&hostos).Where("id = ?", input.ID).Updates(&hostos).First(&hostos).Error
	if err != nil {
		return &hostos, err
	}
	return &hostos, nil
}
func (r *mutationResolver) DeleteHostOs(ctx context.Context, input genModels.GetIDInput) (*models.HostOS, error) {
	var hostos models.HostOS
	if err := db.Where("id = ?", input.ID).Delete(&hostos).Unscoped().First(&hostos).Error; err != nil {
		return &hostos, err
	}
	return &hostos, nil
}
func (r *mutationResolver) BulkDeleteHostOs(ctx context.Context, input genModels.BulkIDInput) ([]*models.HostOS, error) {
	var hostoses []*models.HostOS
	if err := db.Where("id IN (?)", input.Ids).Delete(&hostoses).Unscoped().Find(&hostoses).Error; err != nil {
		return hostoses, err
	}
	return hostoses, nil
}
