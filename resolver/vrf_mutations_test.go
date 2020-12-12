package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestVrfMutations(t *testing.T) {
	testData := vrfTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.VrfParamStruct{
			Name: "new test name",
			Note: "new test note",
		}
		input := `{
			name:"` + p.Name + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createVrf(input:", input, ")", testdata.VrfResp, "}"}, "")

		var resp struct {
			CreateVrf testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateVrf.Name)
		require.Equal(t, p.Note, resp.CreateVrf.Note)
	})

	t.Run("Update", func(t *testing.T) {
		hostosID := testData[1].ID
		type updatePramStruct struct {
			testdata.VrfParamStruct
			id string
		}
		p := updatePramStruct{
			VrfParamStruct: testdata.VrfParamStruct{
				Name: "test name 2 updated",
				Note: "test note 2 updated",
			},
			id: string(hostosID),
		}
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateVrf(input:", input, ")", testdata.VrfResp, "}"}, "")

		var resp struct {
			UpdateVrf testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateVrf.ID)
		require.Equal(t, p.Name, resp.UpdateVrf.Name)
		require.Equal(t, p.Note, resp.UpdateVrf.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteVrf(input:{id:"`, p, `"})`, testdata.VrfResp, "}"}, "")

		var resp struct {
			DeleteVrf testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteVrf.ID)
		require.NotNil(t, resp.DeleteVrf.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteVrf(input:{ids:["`, ids, `"]})`, testdata.VrfResp, "}"}, "")

		var resp struct {
			BulkDeleteVrf []testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteVrf, len(p))
		for _, r := range resp.BulkDeleteVrf {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
