package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateVrf(ctx context.Context, input genModels.CreateVrfInput) (*models.Vrf, error) {
	var vrf models.Vrf
	vrf.Name = input.Name
	if input.Note != nil && *input.Note != "" {
		vrf.Note = *input.Note
	}
	if err := db.Create(&vrf).Error; err != nil {
		return &vrf, err
	}
	return &vrf, nil
}

func (r *mutationResolver) UpdateVrf(ctx context.Context, input genModels.UpdateVrfInput) (*models.Vrf, error) {
	var vrf models.Vrf
	if input.Name != nil && *input.Name != "" {
		vrf.Name = *input.Name
	}
	if input.Note != nil && *input.Note != "" {
		vrf.Note = *input.Note
	}
	err := db.Model(&vrf).Where("id = ?", input.ID).Updates(&vrf).First(&vrf).Error
	if err != nil {
		return &vrf, err
	}
	return &vrf, nil
}

func (r *mutationResolver) DeleteVrf(ctx context.Context, input genModels.GetIDInput) (*models.Vrf, error) {
	var vrf models.Vrf
	if err := db.Where("id = ?", input.ID).Delete(&vrf).Unscoped().First(&vrf).Error; err != nil {
		return &vrf, err
	}
	return &vrf, nil
}

func (r *mutationResolver) BulkDeleteVrf(ctx context.Context, input genModels.BulkIDInput) ([]*models.Vrf, error) {
	var vrfs []*models.Vrf
	if err := db.Where("id IN (?)", input.Ids).Delete(&vrfs).Unscoped().Find(&vrfs).Error; err != nil {
		return vrfs, err
	}
	return vrfs, nil
}
