package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateRack(ctx context.Context, input genModels.CreateRackInput) (*models.Rack, error) {
	var rack models.Rack
	rack.Name = input.Name
	rack.Status = input.Status
	rack.Units = input.Units
	if input.SiteID != nil && *input.SiteID != "" {
		rack.SiteID = *input.SiteID
	}
	if input.Note != nil && *input.Note != "" {
		rack.Note = *input.Note
	}
	if err := db.Create(&rack).Error; err != nil {
		return &rack, err
	}
	return &rack, nil
}

func (r *mutationResolver) UpdateRack(ctx context.Context, input genModels.UpdateRackInput) (*models.Rack, error) {
	var rack models.Rack
	if input.Name != nil && *input.Name != "" {
		rack.Name = *input.Name
	}
	if input.Status != nil && *input.Status != 0 {
		rack.Status = *input.Status
	}
	if input.Units != nil && *input.Units != 0 {
		rack.Units = *input.Units
	}
	if input.SiteID != nil && *input.SiteID != "" {
		rack.SiteID = *input.SiteID
	}
	if input.Note != nil && *input.Note != "" {
		rack.Note = *input.Note
	}
	err := db.Model(&rack).Where("id = ?", input.ID).Updates(&rack).First(&rack).Error
	if err != nil {
		return &rack, err
	}
	return &rack, nil
}

func (r *mutationResolver) DeleteRack(ctx context.Context, input genModels.GetIDInput) (*models.Rack, error) {
	var rack models.Rack
	if err := db.Where("id = ?", input.ID).Delete(&rack).Unscoped().First(&rack).Error; err != nil {
		return &rack, err
	}
	return &rack, nil
}

func (r *mutationResolver) BulkDeleteRack(ctx context.Context, input genModels.BulkIDInput) ([]*models.Rack, error) {
	var racks []*models.Rack
	if err := db.Where("id IN (?)", input.Ids).Delete(&racks).Unscoped().Find(&racks).Error; err != nil {
		return racks, err
	}
	return racks, nil
}
