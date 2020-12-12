package resolver

import (
	"github.com/taktakty/netlabi/models"
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestPortMutations(t *testing.T) {
	testData := portTestData

	t.Run("Create", func(t *testing.T) {
		type createParamStruct struct {
			testdata.PortParamStruct
			DeviceID models.ID
		}
		p := createParamStruct{
			PortParamStruct: testdata.PortParamStruct{
				Name:   "new test name",
				Status: 1,
				Note:   "new test note",
			},
			DeviceID: deviceTestData[8].ID,
		}
		status := strconv.Itoa(p.Status)
		deviceID := string(p.DeviceID)
		input := `{
			name:"` + p.Name + `",
			status:` + status + `,
			note:"` + p.Note + `",
            deviceId:"` + deviceID + `"
		}`
		q := strings.Join([]string{"mutation {createPort(input:", input, ")", testdata.PortResp, "}"}, "")

		var resp struct {
			CreatePort testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreatePort.Name)
		require.Equal(t, p.Status, resp.CreatePort.Status)
		require.Equal(t, p.Note, resp.CreatePort.Note)
	})

	t.Run("Update", func(t *testing.T) {
		portID := testData[1].ID
		type updatePramStruct struct {
			testdata.PortParamStruct
			id string
		}
		p := updatePramStruct{
			PortParamStruct: testdata.PortParamStruct{
				Name:   "test name 2 updated",
				Status: 3,
				Note:   "test note 2 updated",
			},
			id: string(portID),
		}
		status := strconv.Itoa(p.Status)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			status:` + status + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updatePort(input:", input, ")", testdata.PortResp, "}"}, "")

		var resp struct {
			UpdatePort testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdatePort.ID)
		require.Equal(t, p.Name, resp.UpdatePort.Name)
		require.Equal(t, p.Status, resp.UpdatePort.Status)
		require.Equal(t, p.Note, resp.UpdatePort.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deletePort(input:{id:"`, p, `"})`, testdata.PortResp, "}"}, "")

		var resp struct {
			DeletePort testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeletePort.ID)
		require.NotNil(t, resp.DeletePort.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeletePort(input:{ids:["`, ids, `"]})`, testdata.PortResp, "}"}, "")

		var resp struct {
			BulkDeletePort []testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeletePort, len(p))
		for _, r := range resp.BulkDeletePort {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
