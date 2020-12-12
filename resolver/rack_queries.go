package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *queryResolver) GetRack(ctx context.Context, input genModels.GetIDInput) (*models.Rack, error) {
	var rack models.Rack
	rack.ID = input.ID
	if err := db.First(&rack).Error; err != nil {
		return &rack, err
	}
	return &rack, nil
}

func (r *queryResolver) GetRacks(ctx context.Context, input genModels.SearchRackInput) ([]*models.Rack, error) {
	var racks []*models.Rack
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if input.SiteID != nil && *input.SiteID != "" {
		tx = tx.Where("site_id = ?", *input.SiteID)
	}
	if input.SiteName != nil && *input.SiteName != "" {
		var sites []*models.Site
		if err := db.Select("id").Where("name Like ?", "%"+*input.SiteName+"%").Find(&sites).Error; err != nil {
			return racks, err
		}
		var ids []models.ID
		for _, site := range sites {
			ids = append(ids, site.ID)
		}
		tx = tx.Where("site_id IN (?)", ids)
	}
	if err := tx.Find(&racks).Error; err != nil {
		return racks, err
	}
	return racks, nil
}

type rackResolver struct{ *Resolver }

func (r *rackResolver) Site(ctx context.Context, obj *models.Rack) (*models.Site, error) {
	return models.CtxLoaders(ctx).SiteLoader.Load(obj.SiteID)
}
func (r *rackResolver) Devices(ctx context.Context, obj *models.Rack) ([]*models.Device, error) {
	return models.CtxLoaders(ctx).DeviceByRackSliceLoader.Load(obj.ID)
}
