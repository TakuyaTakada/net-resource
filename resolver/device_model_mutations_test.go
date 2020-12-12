package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestDeviceModelMutations(t *testing.T) {
	testData := deviceModelTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.DeviceModelParamStruct{
			Name:   "new test name",
			Height: 1,
			Width:  100,
			Note:   "new test note",
		}
		height := strconv.Itoa(p.Height)
		width := strconv.Itoa(p.Width)
		input := `{
			name:"` + p.Name + `",
			height:` + height + `,
			width:` + width + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createDeviceModel(input:", input, ")", testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			CreateDeviceModel testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateDeviceModel.Name)
		require.Equal(t, p.Height, resp.CreateDeviceModel.Height)
		require.Equal(t, p.Width, resp.CreateDeviceModel.Width)
		require.Equal(t, p.Note, resp.CreateDeviceModel.Note)
	})

	t.Run("Update", func(t *testing.T) {
		deviceModelID := testData[1].ID
		type updatePramStruct struct {
			testdata.DeviceModelParamStruct
			id string
		}
		p := updatePramStruct{
			DeviceModelParamStruct: testdata.DeviceModelParamStruct{
				Name:   "test name 2 updated",
				Height: 10,
				Width:  80,
				Note:   "test note 2 updated",
			},
			id: string(deviceModelID),
		}
		height := strconv.Itoa(p.Height)
		width := strconv.Itoa(p.Width)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			height:` + height + `,
			width:` + width + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateDeviceModel(input:", input, ")", testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			UpdateDeviceModel testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateDeviceModel.ID)
		require.Equal(t, p.Name, resp.UpdateDeviceModel.Name)
		require.Equal(t, p.Height, resp.UpdateDeviceModel.Height)
		require.Equal(t, p.Width, resp.UpdateDeviceModel.Width)
		require.Equal(t, p.Note, resp.UpdateDeviceModel.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteDeviceModel(input:{id:"`, p, `"})`, testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			DeleteDeviceModel testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteDeviceModel.ID)
		require.NotNil(t, resp.DeleteDeviceModel.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteDeviceModel(input:{ids:["`, ids, `"]})`, testdata.DeviceModelResp, "}"}, "")

		var resp struct {
			BulkDeleteDeviceModel []testdata.DeviceModelRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteDeviceModel, len(p))
		for _, r := range resp.BulkDeleteDeviceModel {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
