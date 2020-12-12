package cmd

import (
	"github.com/taktakty/netlabi/config"
	"github.com/jinzhu/gorm"
	"time"

	// PostgreSQL driver
	_ "github.com/jinzhu/gorm/dialects/postgres"
	// Sqlite3 driver
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Connect returns DB instance
func Connect() *gorm.DB {
	countdown := 10
	for countdown > 0 {
		if ci := config.GetCI(); !ci {
			param := config.GenDBParam()
			db, err := gorm.Open("postgres", param)
			if err != nil {
				time.Sleep(time.Second * 3)
				countdown--
				continue
			}
			db.LogMode(config.GetDebug())
			return db
		}
		param := config.GenTestDBParam()
		db, err := gorm.Open("postgres", param)
		if err != nil {
			time.Sleep(time.Second * 3)
			countdown--
			continue
		}
		db.LogMode(config.GetDebug())
		return db
	}
	panic("Cannot connect DB")
}
