package models

// go run github.com/vektah/dataloaden RackSliceLoader ID '[]*github.com/taktakty/netlab/models.Rack'
// go run github.com/vektah/dataloaden SiteLoader ID '*github.com/taktakty/netlab/models.Site'
// go run github.com/vektah/dataloaden DeviceSliceLoader ID '[]*github.com/taktakty/netlabi/models.Device'
// go run github.com/vektah/dataloaden RackLoader ID '*github.com/taktakty/netlabi/models.Rack'
// go run github.com/vektah/dataloaden DeviceModelLoader ID '*github.com/taktakty/netlabi/models.DeviceModel'
// go run github.com/vektah/dataloaden HostSliceLoader ID '[]*github.com/taktakty/netlabi/models.Host'
// go run github.com/vektah/dataloaden IpaddrSliceLoader ID '[]*github.com/taktakty/netlabi/models.Ipaddr'
// go run github.com/vektah/dataloaden IpaddrLoader ID '*github.com/taktakty/netlabi/models.Ipaddr'
// go run github.com/vektah/dataloaden VrfLoader ID '*github.com/taktakty/netlabi/models.Vrf'
// go run github.com/vektah/dataloaden IpSegmentSliceLoader ID '[]*github.com/taktakty/netlabi/models.IpSegment'
// go run github.com/vektah/dataloaden SegmentUseLoader ID '*github.com/taktakty/netlabi/models.SegmentUse'
// go run github.com/vektah/dataloaden DeviceLoader ID '*github.com/taktakty/netlabi/models.Device'
// go run github.com/vektah/dataloaden PortSliceLoader ID '[]*github.com/taktakty/netlabi/models.Port'

import (
	"context"
	"github.com/jinzhu/gorm"
	"net/http"
	"time"
)

type ctxKeyType struct{ name string }

var ctxKey = ctxKeyType{"userCtx"}

// Loaders define lazy loaders
type Loaders struct {
	RackLoader                       *RackLoader
	RackSliceLoader                  *RackSliceLoader
	SiteLoader                       *SiteLoader
	DeviceByModelSliceLoader         *DeviceSliceLoader
	DeviceByRackSliceLoader          *DeviceSliceLoader
	DeviceByHostSliceLoader          *DeviceSliceLoader
	DeviceModelLoader                *DeviceModelLoader
	HostLoader                       *HostLoader
	HostByHostOSSliceLoader          *HostSliceLoader
	HostOSLoader                     *HostOSLoader
	IpaddrByIpSegmentSliceLoader     *IpaddrSliceLoader
	IpSegmentLoader                  *IpSegmentLoader
	IpSegmentByVrfSliceLoader        *IpSegmentSliceLoader
	IpSegmentBySegmentUseSliceLoader *IpSegmentSliceLoader
	IpaddrLoader                     *IpaddrLoader
	VrfLoader                        *VrfLoader
	SegmentUseLoader                 *SegmentUseLoader
	DeviceLoader                     *DeviceLoader
	PortByDeviceSliceLoader          *PortSliceLoader
}

// LoaderMiddleware for resolving n + 1 issue
func LoaderMiddleware(db *gorm.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ldrs := Loaders{}

		wait := 200 * time.Microsecond

		ldrs.RackLoader = &RackLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Rack, errors []error) {
				var racks []*Rack
				results = make([]*Rack, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&racks).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range racks {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.RackSliceLoader = &RackSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Rack, []error) {
				var racks []*Rack
				results := make([][]*Rack, len(keys))
				errors := make([]error, len(keys))
				err := db.Where("site_id IN (?)", keys).Find(&racks).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range racks {
						if r.SiteID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, racks)

				return results, errors
			},
		}

		ldrs.SiteLoader = &SiteLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Site, errors []error) {
				var sites []*Site
				results = make([]*Site, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&sites).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range sites {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.DeviceByModelSliceLoader = &DeviceSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Device, []error) {
				var devices []*Device
				results := make([][]*Device, len(keys))
				errors := make([]error, len(keys))
				err := db.Where("device_model_id IN (?)", keys).Find(&devices).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range devices {
						if r.DeviceModelID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, devices)

				return results, errors
			},
		}

		ldrs.DeviceByRackSliceLoader = &DeviceSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Device, []error) {
				var devices []*Device
				results := make([][]*Device, len(keys))
				errors := make([]error, len(keys))
				err := db.Where("rack_id IN (?)", keys).Find(&devices).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range devices {
						if r.RackID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, devices)

				return results, errors
			},
		}

		ldrs.DeviceByHostSliceLoader = &DeviceSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Device, []error) {
				var devices []*Device
				results := make([][]*Device, len(keys))
				errors := make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("host_id IN (?)", exKeys).Find(&devices).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range devices {
						if r.HostID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, devices)

				return results, errors
			},
		}

		ldrs.DeviceModelLoader = &DeviceModelLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*DeviceModel, errors []error) {
				var deviceModels []*DeviceModel
				results = make([]*DeviceModel, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&deviceModels).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range deviceModels {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.HostLoader = &HostLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Host, errors []error) {
				var hosts []*Host
				results = make([]*Host, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&hosts).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range hosts {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.HostByHostOSSliceLoader = &HostSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Host, []error) {
				var hosts []*Host
				results := make([][]*Host, len(keys))
				errors := make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("host_os_id IN (?)", exKeys).Find(&hosts).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range hosts {
						if r.HostOSID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, hosts)

				return results, errors
			},
		}

		ldrs.HostOSLoader = &HostOSLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*HostOS, errors []error) {
				var racks []*HostOS
				results = make([]*HostOS, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&racks).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range racks {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.IpaddrByIpSegmentSliceLoader = &IpaddrSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Ipaddr, []error) {
				var ipaddrs []*Ipaddr
				results := make([][]*Ipaddr, len(keys))
				errors := make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("ip_segment_id IN (?)", exKeys).Find(&ipaddrs).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ipaddrs {
						if r.IPSegmentID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, ipaddrs)

				return results, errors
			},
		}

		ldrs.IpSegmentLoader = &IpSegmentLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*IpSegment, errors []error) {
				var ipSegments []*IpSegment
				results = make([]*IpSegment, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&ipSegments).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ipSegments {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.IpSegmentByVrfSliceLoader = &IpSegmentSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*IpSegment, []error) {
				var ipSegments []*IpSegment
				results := make([][]*IpSegment, len(keys))
				errors := make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("vrf_id IN (?)", exKeys).Find(&ipSegments).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ipSegments {
						if r.VrfID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, ipSegments)

				return results, errors
			},
		}

		ldrs.IpSegmentBySegmentUseSliceLoader = &IpSegmentSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*IpSegment, []error) {
				var ipSegments []*IpSegment
				results := make([][]*IpSegment, len(keys))
				errors := make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("segment_use_id IN (?)", exKeys).Find(&ipSegments).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ipSegments {
						if r.VrfID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, ipSegments)

				return results, errors
			},
		}

		ldrs.IpaddrLoader = &IpaddrLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Ipaddr, errors []error) {
				var ipaddr []*Ipaddr
				results = make([]*Ipaddr, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&ipaddr).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ipaddr {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.VrfLoader = &VrfLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Vrf, errors []error) {
				var vrf []*Vrf
				results = make([]*Vrf, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&vrf).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range vrf {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.SegmentUseLoader = &SegmentUseLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*SegmentUse, errors []error) {
				var segmentUse []*SegmentUse
				results = make([]*SegmentUse, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&segmentUse).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range segmentUse {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.DeviceLoader = &DeviceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) (results []*Device, errors []error) {
				var devices []*Device
				results = make([]*Device, len(keys))
				errors = make([]error, len(keys))
				var exKeys []ID
				for _, key := range keys {
					if key != "" {
						exKeys = append(exKeys, key)
					}
				}
				err := db.Where("id IN (?)", exKeys).Find(&devices).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range devices {
						if r.ID == key {
							results[i] = r
						}
					}
				}

				return results, errors
			},
		}

		ldrs.PortByDeviceSliceLoader = &PortSliceLoader{
			wait:     wait,
			maxBatch: 100,
			fetch: func(keys []ID) ([][]*Port, []error) {
				var ports []*Port
				results := make([][]*Port, len(keys))
				errors := make([]error, len(keys))
				err := db.Where("device_id IN (?)", keys).Find(&ports).Error
				errors = append(errors, err)
				for i, key := range keys {
					for _, r := range ports {
						if r.DeviceID == key {
							results[i] = append(results[i], r)
						}
					}
				}
				results = append(results, ports)

				return results, errors
			},
		}

		dlCtx := context.WithValue(r.Context(), ctxKey, ldrs)
		next.ServeHTTP(w, r.WithContext(dlCtx))
	})
}

// CtxLoaders load ctx loader
func CtxLoaders(ctx context.Context) Loaders {
	return ctx.Value(ctxKey).(Loaders)
}
