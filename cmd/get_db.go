package cmd

import (
	"sync"

	"github.com/jinzhu/gorm"
)

var once sync.Once
var instance *gorm.DB

//GetInstance returns DB instance
func GetInstance() *gorm.DB {
	once.Do(func() {
		Migrate()
		instance = Connect()
	})
	return instance
}
