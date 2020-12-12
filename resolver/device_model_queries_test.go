package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestDeviceModelQueries(t *testing.T) {
	testData := deviceModelTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getDeviceModel(input:{id:"`, p, `"})`, testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			GetDeviceModel testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetDeviceModel.ID)
		require.Equal(t, testData[0].Name, resp.GetDeviceModel.Name)
		require.Equal(t, testData[0].Height, resp.GetDeviceModel.Height)
		require.Equal(t, testData[0].Width, resp.GetDeviceModel.Width)
		require.Equal(t, testData[0].Note, resp.GetDeviceModel.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getDeviceModels(input:{name:"for search"})`, testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			GetDeviceModels []testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetDeviceModels, len(forSearchTestData))
		for i, r := range resp.GetDeviceModels {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Height, r.Height)
			require.Equal(t, forSearchTestData[i].Width, r.Width)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
