package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestHostOSMutations(t *testing.T) {
	testData := hostosTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.HostOSParamStruct{
			Name: "new test name",
			Note: "new test note",
		}
		input := `{
			name:"` + p.Name + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createHostOS(input:", input, ")", testdata.HostOSResp, "}"}, "")

		var resp struct {
			CreateHostOS testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateHostOS.Name)
		require.Equal(t, p.Note, resp.CreateHostOS.Note)
	})

	t.Run("Update", func(t *testing.T) {
		hostosID := testData[1].ID
		type updatePramStruct struct {
			testdata.HostOSParamStruct
			id string
		}
		p := updatePramStruct{
			HostOSParamStruct: testdata.HostOSParamStruct{
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
		q := strings.Join([]string{"mutation {updateHostOS(input:", input, ")", testdata.HostOSResp, "}"}, "")

		var resp struct {
			UpdateHostOS testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateHostOS.ID)
		require.Equal(t, p.Name, resp.UpdateHostOS.Name)
		require.Equal(t, p.Note, resp.UpdateHostOS.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteHostOS(input:{id:"`, p, `"})`, testdata.HostOSResp, "}"}, "")

		var resp struct {
			DeleteHostOS testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteHostOS.ID)
		require.NotNil(t, resp.DeleteHostOS.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteHostOS(input:{ids:["`, ids, `"]})`, testdata.HostOSResp, "}"}, "")

		var resp struct {
			BulkDeleteHostOS []testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteHostOS, len(p))
		for _, r := range resp.BulkDeleteHostOS {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
