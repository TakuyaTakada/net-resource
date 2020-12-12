package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
)

type hostOSResolver struct{ *Resolver }

func (r *queryResolver) GetHostOs(ctx context.Context, input genModels.GetIDInput) (*models.HostOS, error) {
	var hostos models.HostOS
	hostos.ID = input.ID
	if err := db.First(&hostos).Error; err != nil {
		return &hostos, err
	}
	return &hostos, nil
}
func (r *queryResolver) GetHostOSes(ctx context.Context, input genModels.SearchHostOSInput) ([]*models.HostOS, error) {
	var hostos []*models.HostOS
	tx := db
	if input.Name != nil && *input.Name != "" {
		tx = tx.Where("name LIKE ?", "%"+*input.Name+"%")
	}
	if err := tx.Find(&hostos).Error; err != nil {
		return hostos, err
	}
	return hostos, nil
}
func (r *hostOSResolver) Hosts(ctx context.Context, obj *models.HostOS) ([]*models.Host, error) {
	return models.CtxLoaders(ctx).HostByHostOSSliceLoader.Load(obj.ID)
}
