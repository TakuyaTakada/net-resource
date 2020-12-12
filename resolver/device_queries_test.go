package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestDeviceQueries(t *testing.T) {
	testData := deviceTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getDevice(input:{id:"`, p, `"})`, testdata.DeviceResp, "}"}, "")

		var resp struct {
			GetDevice testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetDevice.ID)
		require.Equal(t, testData[0].Name, resp.GetDevice.Name)
		require.Equal(t, testData[0].Status, resp.GetDevice.Status)
		require.Equal(t, testData[0].Position, resp.GetDevice.Position)
		require.Equal(t, testData[0].Note, resp.GetDevice.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getDevices(input:{name:"for search"})`, testdata.DeviceResp, "}"}, "")

		var resp struct {
			GetDevices []testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetDevices, len(forSearchTestData))
		for i, r := range resp.GetDevices {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Status, r.Status)
			require.Equal(t, forSearchTestData[i].Position, r.Position)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
