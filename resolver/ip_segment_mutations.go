package resolver

import (
	"github.com/taktakty/netlabi/models"
	genModels "github.com/taktakty/netlabi/models/generated"
	"context"
	"net"
)

func inc(ip net.IP) {
	for j := len(ip) - 1; j >= 0; j-- {
		ip[j]++
		if ip[j] > 0 {
			break
		}
	}
}
func resolveIps(cidr string) ([]string, error) {
	ip, ipnet, err := net.ParseCIDR(cidr)
	if err != nil {
		return nil, err
	}

	var ips []string
	for ip := ip.Mask(ipnet.Mask); ipnet.Contains(ip); inc(ip) {
		ips = append(ips, ip.String())
	}
	return ips, nil
}

func (r *mutationResolver) CreateIPSegment(ctx context.Context, input genModels.CreateIPSegmentInput) (*models.IpSegment, error) {
	var ipSegment models.IpSegment
	ipSegment.IPSegment = input.IPSegment
	if input.VrfID != nil && *input.VrfID != "" {
		ipSegment.VrfID = *input.VrfID
	}
	if input.UseID != nil && *input.UseID != "" {
		ipSegment.SegmentUseID = *input.UseID
	}
	if input.Note != nil && *input.Note != "" {
		ipSegment.Note = *input.Note
	}
	if ips, err := resolveIps(string(input.IPSegment)); err != nil {
		return &ipSegment, err
	} else {
		for idx, ip := range ips {
			var ipaddr models.Ipaddr
			if idx == 0 {
				ipaddr.Type = 1 // NW Address
				ipaddr.Status = 2
			} else if idx == len(ips)-1 {
				ipaddr.Type = 2 // Broadcast Address
				ipaddr.Status = 2
			} else {
				ipaddr.Type = 3 // Host Address
				ipaddr.Status = 1
			}
			ipaddr.IP = models.IP(ip)
			ipSegment.Ipaddr = append(ipSegment.Ipaddr, ipaddr)
		}
	}
	if err := db.Create(&ipSegment).Error; err != nil {
		return &ipSegment, err
	}
	return &ipSegment, nil
}
func (r *mutationResolver) UpdateIPSegment(ctx context.Context, input genModels.UpdateIPSegmentInput) (*models.IpSegment, error) {
	var ipSegment models.IpSegment
	if input.VrfID != nil && *input.VrfID != "" {
		ipSegment.VrfID = *input.VrfID
	}
	if input.UseID != nil && *input.UseID != "" {
		ipSegment.SegmentUseID = *input.UseID
	}
	if input.Note != nil && *input.Note != "" {
		ipSegment.Note = *input.Note
	}
	err := db.Model(&ipSegment).Where("id = ?", input.ID).Updates(&ipSegment).First(&ipSegment).Error
	if err != nil {
		return &ipSegment, err
	}
	return &ipSegment, nil
}
func (r *mutationResolver) DeleteIPSegment(ctx context.Context, input genModels.GetIDInput) (*models.IpSegment, error) {
	var ipSegment models.IpSegment
	if err := db.Where("id = ?", input.ID).Delete(&ipSegment).Unscoped().First(&ipSegment).Error; err != nil {
		return &ipSegment, err
	}
	return &ipSegment, nil
}
func (r *mutationResolver) BulkDeleteIPSegment(ctx context.Context, input genModels.BulkIDInput) ([]*models.IpSegment, error) {
	var ipSegments []*models.IpSegment
	if err := db.Where("id IN (?)", input.Ids).Delete(&ipSegments).Unscoped().Find(&ipSegments).Error; err != nil {
		return ipSegments, err
	}
	return ipSegments, nil
}
