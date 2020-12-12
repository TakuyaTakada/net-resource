package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type ipSegmentResolver struct{ *Resolver }

func (r *queryResolver) GetIPSegment(ctx context.Context, input genModels.GetIDInput) (*models.IpSegment, error) {
	var ipSegment models.IpSegment
	ipSegment.ID = input.ID
	if err := db.First(&ipSegment).Error; err != nil {
		return &ipSegment, err
	}
	return &ipSegment, nil
}
func (r *queryResolver) GetIPSegments(ctx context.Context, input genModels.SearchIPSegmentInput) ([]*models.IpSegment, error) {
	var ipSegments []*models.IpSegment
	tx := db
	if input.IPSegment != nil && *input.IPSegment != "" {
		tx = tx.Where("TEXT(ip_segment) LIKE ?", *input.IPSegment+"%")
	}
	if input.UseID != nil && *input.UseID != "" {
		tx = tx.Where("segment_use_id = ?", *input.UseID)
	}
	if input.VrfID != nil && *input.VrfID != "" {
		tx = tx.Where("vrf_id = ?", *input.VrfID)
	}
	if err := tx.Find(&ipSegments).Error; err != nil {
		return ipSegments, err
	}
	return ipSegments, nil
}

func (r *ipSegmentResolver) Vrf(ctx context.Context, obj *models.IpSegment) (*models.Vrf, error) {
	return models.CtxLoaders(ctx).VrfLoader.Load(obj.VrfID)
}

func (r *ipSegmentResolver) Ipaddrs(ctx context.Context, obj *models.IpSegment) ([]*models.Ipaddr, error) {
	return models.CtxLoaders(ctx).IpaddrByIpSegmentSliceLoader.Load(obj.ID)
}

func (r *ipSegmentResolver) Use(ctx context.Context, obj *models.IpSegment) (*models.SegmentUse, error) {
	return models.CtxLoaders(ctx).SegmentUseLoader.Load(obj.SegmentUseID)
}
