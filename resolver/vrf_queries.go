package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type vrfResolver struct{ *Resolver }

func (r *queryResolver) GetVrf(ctx context.Context, input genModels.GetIDInput) (*models.Vrf, error) {
	var vrf models.Vrf
	vrf.ID = input.ID
	if err := db.First(&vrf).Error; err != nil {
		return &vrf, err
	}
	return &vrf, nil
}

func (r *queryResolver) GetVrfs(ctx context.Context, input genModels.SearchVrfInput) ([]*models.Vrf, error) {
	var vrfs []*models.Vrf
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if err := tx.Find(&vrfs).Error; err != nil {
		return vrfs, err
	}
	return vrfs, nil
}

func (r *vrfResolver) IPSegments(ctx context.Context, obj *models.Vrf) ([]*models.IpSegment, error) {
	return models.CtxLoaders(ctx).IpSegmentByVrfSliceLoader.Load(obj.ID)
}
