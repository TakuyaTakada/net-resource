package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateSegmentUse(ctx context.Context, input genModels.CreateSegmentUseInput) (*models.SegmentUse, error) {
	var segmentUse models.SegmentUse
	segmentUse.Name = input.Name
	if input.Note != nil && *input.Note != "" {
		segmentUse.Note = *input.Note
	}
	if err := db.Create(&segmentUse).Error; err != nil {
		return &segmentUse, err
	}
	return &segmentUse, nil
}

func (r *mutationResolver) UpdateSegmentUse(ctx context.Context, input genModels.UpdateSegmentUseInput) (*models.SegmentUse, error) {
	var segmentUse models.SegmentUse
	if input.Name != nil && *input.Name != "" {
		segmentUse.Name = *input.Name
	}
	if input.Note != nil && *input.Note != "" {
		segmentUse.Note = *input.Note
	}
	err := db.Model(&segmentUse).Where("id = ?", input.ID).Updates(&segmentUse).First(&segmentUse).Error
	if err != nil {
		return &segmentUse, err
	}
	return &segmentUse, nil
}

func (r *mutationResolver) DeleteSegmentUse(ctx context.Context, input genModels.GetIDInput) (*models.SegmentUse, error) {
	var segmentUse models.SegmentUse
	if err := db.Where("id = ?", input.ID).Delete(&segmentUse).Unscoped().First(&segmentUse).Error; err != nil {
		return &segmentUse, err
	}
	return &segmentUse, nil
}

func (r *mutationResolver) BulkDeleteSegmentUse(ctx context.Context, input genModels.BulkIDInput) ([]*models.SegmentUse, error) {
	var segmentUses []*models.SegmentUse
	if err := db.Where("id IN (?)", input.Ids).Delete(&segmentUses).Unscoped().Find(&segmentUses).Error; err != nil {
		return segmentUses, err
	}
	return segmentUses, nil
}
