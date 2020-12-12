package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) CreateSite(ctx context.Context, input genModels.CreateSiteInput) (*models.Site, error) {
	var site models.Site
	site.Name = input.Name
	site.Status = input.Status
	if input.PostalCode != nil && *input.PostalCode != "" {
		site.PostalCode = *input.PostalCode
	}
	if input.PhoneNumber != nil && *input.PhoneNumber != "" {
		site.PhoneNumber = *input.PhoneNumber
	}
	if input.Address != nil && *input.Address != "" {
		site.Address = *input.Address
	}
	if input.Note != nil && *input.Note != "" {
		site.Note = *input.Note
	}
	if err := db.Create(&site).Error; err != nil {
		return &site, err
	}
	return &site, nil
}

func (r *mutationResolver) UpdateSite(ctx context.Context, input genModels.UpdateSiteInput) (*models.Site, error) {
	var site models.Site
	if input.Name != nil && *input.Name != "" {
		site.Name = *input.Name
	}
	if input.Status != nil && *input.Status != 0 {
		site.Status = *input.Status
	}
	if input.PostalCode != nil && *input.PostalCode != "" {
		site.PostalCode = *input.PostalCode
	}
	if input.PhoneNumber != nil && *input.PhoneNumber != "" {
		site.PhoneNumber = *input.PhoneNumber
	}
	if input.Address != nil && *input.Address != "" {
		site.Address = *input.Address
	}
	if input.Note != nil && *input.Note != "" {
		site.Note = *input.Note
	}
	err := db.Model(&site).Where("id = ?", input.ID).Updates(&site).First(&site).Error
	if err != nil {
		return &site, err
	}
	return &site, nil
}

func (r *mutationResolver) DeleteSite(ctx context.Context, input genModels.GetIDInput) (*models.Site, error) {
	var site models.Site
	if err := db.Where("id = ?", input.ID).Delete(&site).Unscoped().First(&site).Error; err != nil {
		return &site, err
	}
	return &site, nil
}

func (r *mutationResolver) BulkDeleteSite(ctx context.Context, input genModels.BulkIDInput) ([]*models.Site, error) {
	var sites []*models.Site
	if err := db.Where("id IN (?)", input.Ids).Delete(&sites).Unscoped().Find(&sites).Error; err != nil {
		return sites, err
	}
	return sites, nil
}
