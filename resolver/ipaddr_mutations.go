package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

func (r *mutationResolver) UpdateIpaddr(ctx context.Context, input genModels.UpdateIpaddrInput) (*models.Ipaddr, error) {
	var ipaddr models.Ipaddr
	if input.Status != nil && *input.Status != 0 {
		ipaddr.Status = *input.Status
	}
	if input.Type != nil && *input.Type != 0 {
		ipaddr.Type = *input.Type
	}
	if input.Note != nil && *input.Note != "" {
		ipaddr.Note = *input.Note
	}
	err := db.Model(&ipaddr).Where("id = ?", input.ID).Updates(&ipaddr).First(&ipaddr).Error
	if err != nil {
		return &ipaddr, err
	}
	return &ipaddr, nil
}
