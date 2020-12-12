package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
	"io"
	"strconv"
	"time"
)

// Base common fields
type (
	Base struct {
		ID        ID        `gorm:"type:uuid;primary_key;"`
		CreatedAt time.Time `gorm:"not null"`
		UpdatedAt time.Time `gorm:"not null"`
		DeletedAt *time.Time
	}
)

// BeforeCreate will set a UUID rather than numeric ID.
func (base *Base) BeforeCreate(scope *gorm.Scope) error {
	uuid := uuid.NewV4()
	return scope.SetColumn("ID", uuid.String())
}

// ID uuid
type ID string

// MarshalGQL for ID
func (id ID) MarshalGQL(w io.Writer) {
	str := strconv.Quote(string(id))
	fmt.Fprint(w, str)
}

// UnmarshalGQL for ID
func (id *ID) UnmarshalGQL(v interface{}) error {
	parsed, ok := v.(string)
	if !ok {
		return fmt.Errorf("id must be string")
	}
	*id = ID(parsed)
	return nil
}
