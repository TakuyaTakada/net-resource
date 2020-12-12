package resolver

import (
	"context"

	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
)

func (r *queryResolver) GetSite(ctx context.Context, input genModels.GetIDInput) (*models.Site, error) {
	var site models.Site
	site.ID = input.ID
	if err := db.First(&site).Error; err != nil {
		return &site, err
	}
	return &site, nil
}

func (r *queryResolver) GetSites(ctx context.Context, input genModels.SearchSiteInput) ([]*models.Site, error) {
	var sites []*models.Site
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if input.Status != nil && *input.Status != 0 {
		tx = tx.Where("status = ?", *input.Status)
	}
	if err := tx.Find(&sites).Error; err != nil {
		return sites, err
	}
	return sites, nil
}

type siteResolver struct{ *Resolver }

func (r *siteResolver) Racks(ctx context.Context, obj *models.Site) ([]*models.Rack, error) {
	return models.CtxLoaders(ctx).RackSliceLoader.Load(obj.ID)
}
