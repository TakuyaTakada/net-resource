package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type ipaddrResolver struct{ *Resolver }

func (r *queryResolver) GetIpaddr(ctx context.Context, input genModels.GetIDInput) (*models.Ipaddr, error) {
	var ipaddr models.Ipaddr
	ipaddr.ID = input.ID
	if err := db.First(&ipaddr).Error; err != nil {
		return &ipaddr, err
	}
	return &ipaddr, nil
}
func (r *queryResolver) GetIpaddrs(ctx context.Context, input genModels.SearchIpaddrInput) ([]*models.Ipaddr, error) {
	var ipaddrs []*models.Ipaddr
	tx := db
	if input.IP != nil && *input.IP != "" {
		tx = tx.Where("TEXT(ip) LIKE ?", *input.IP+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if input.Type != nil && *input.Type != 0 {
		tx = tx.Where("type = ?", *input.Type)
	}
	if input.HostID != nil && *input.HostID != "" {
		var host models.Host
		host.ID = *input.HostID
		if err := db.First(&host).Error; err != nil {
			return ipaddrs, err
		}
		tx = tx.Or("id = ?", host.MgmtIPID)
	}
	if input.IPSegmentID != nil && *input.IPSegmentID != "" {
		tx = tx.Where("ip_segment_id = ?", input.IPSegmentID)
	}
	if err := tx.Find(&ipaddrs).Error; err != nil {
		return ipaddrs, err
	}
	return ipaddrs, nil
}
func (r *ipaddrResolver) Host(ctx context.Context, obj *models.Ipaddr) (*models.Host, error) {
	return models.CtxLoaders(ctx).HostLoader.Load(obj.ID)
}
func (r *ipaddrResolver) IPSegment(ctx context.Context, obj *models.Ipaddr) (*models.IpSegment, error) {
	return models.CtxLoaders(ctx).IpSegmentLoader.Load(obj.IPSegmentID)
}
