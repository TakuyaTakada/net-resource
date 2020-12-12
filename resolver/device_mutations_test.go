package resolver

import (
	"github.com/taktakty/netlabi/models"
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestDeviceMutations(t *testing.T) {
	testData := deviceTestData

	t.Run("Create", func(t *testing.T) {
		type createParamStruct struct {
			testdata.DeviceParamStruct
			DeviceModelID models.ID
		}
		p := createParamStruct{
			DeviceParamStruct: testdata.DeviceParamStruct{
				Name:     "new test name",
				Status:   1,
				Position: 40,
				Note:     "new test note",
			},
			DeviceModelID: deviceModelTestData[8].ID,
		}
		status := strconv.Itoa(p.Status)
		position := strconv.Itoa(p.Position)
		modelID := string(p.DeviceModelID)
		input := `{
			name:"` + p.Name + `",
			status:` + status + `,
			position:` + position + `,
			note:"` + p.Note + `",
            deviceModelId:"` + modelID + `"
		}`
		q := strings.Join([]string{"mutation {createDevice(input:", input, ")", testdata.DeviceResp, "}"}, "")

		var resp struct {
			CreateDevice testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateDevice.Name)
		require.Equal(t, p.Status, resp.CreateDevice.Status)
		require.Equal(t, p.Position, resp.CreateDevice.Position)
		require.Equal(t, p.Note, resp.CreateDevice.Note)
	})

	t.Run("Update", func(t *testing.T) {
		deviceID := testData[1].ID
		type updatePramStruct struct {
			testdata.DeviceParamStruct
			id string
		}
		p := updatePramStruct{
			DeviceParamStruct: testdata.DeviceParamStruct{
				Name:     "test name 2 updated",
				Status:   3,
				Position: 34,
				Note:     "test note 2 updated",
			},
			id: string(deviceID),
		}
		status := strconv.Itoa(p.Status)
		position := strconv.Itoa(p.Position)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			status:` + status + `,
			position:` + position + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateDevice(input:", input, ")", testdata.DeviceResp, "}"}, "")

		var resp struct {
			UpdateDevice testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateDevice.ID)
		require.Equal(t, p.Name, resp.UpdateDevice.Name)
		require.Equal(t, p.Status, resp.UpdateDevice.Status)
		require.Equal(t, p.Position, resp.UpdateDevice.Position)
		require.Equal(t, p.Note, resp.UpdateDevice.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteDevice(input:{id:"`, p, `"})`, testdata.DeviceResp, "}"}, "")

		var resp struct {
			DeleteDevice testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteDevice.ID)
		require.NotNil(t, resp.DeleteDevice.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteDevice(input:{ids:["`, ids, `"]})`, testdata.DeviceResp, "}"}, "")

		var resp struct {
			BulkDeleteDevice []testdata.DeviceRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteDevice, len(p))
		for _, r := range resp.BulkDeleteDevice {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
