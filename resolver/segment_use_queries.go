package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type segmentUseResolver struct{ *Resolver }

func (r *queryResolver) GetSegmentUse(ctx context.Context, input genModels.GetIDInput) (*models.SegmentUse, error) {
	var segmentUse models.SegmentUse
	segmentUse.ID = input.ID
	if err := db.First(&segmentUse).Error; err != nil {
		return &segmentUse, err
	}
	return &segmentUse, nil
}

func (r *queryResolver) GetSegmentUses(ctx context.Context, input genModels.SearchSegmentUseInput) ([]*models.SegmentUse, error) {
	var segmentUses []*models.SegmentUse
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if err := tx.Find(&segmentUses).Error; err != nil {
		return segmentUses, err
	}
	return segmentUses, nil
}

func (r *segmentUseResolver) IPSegments(ctx context.Context, obj *models.SegmentUse) ([]*models.IpSegment, error) {
	return models.CtxLoaders(ctx).IpSegmentBySegmentUseSliceLoader.Load(obj.ID)
}
