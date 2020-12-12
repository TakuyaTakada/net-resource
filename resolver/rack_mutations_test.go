package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestRackMutations(t *testing.T) {
	testData := rackTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.RackParamStruct{
			Name:   "new test name",
			Status: 1,
			Units:  42,
			Note:   "new test note",
		}
		status := strconv.Itoa(p.Status)
		units := strconv.Itoa(p.Units)
		input := `{
			name:"` + p.Name + `",
			status:` + status + `,
			units:` + units + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createRack(input:", input, ")", testdata.RackResp, "}"}, "")

		var resp struct{ CreateRack testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateRack.Name)
		require.Equal(t, p.Status, resp.CreateRack.Status)
		require.Equal(t, p.Units, resp.CreateRack.Units)
		require.Equal(t, p.Note, resp.CreateRack.Note)
	})

	t.Run("Update", func(t *testing.T) {
		siteID := testData[1].ID
		type updatePramStruct struct {
			testdata.RackParamStruct
			id string
		}
		p := updatePramStruct{
			RackParamStruct: testdata.RackParamStruct{
				Name:   "test name 2 updated",
				Status: 2,
				Units:  48,
				Note:   "test note 2 updated",
			},
			id: string(siteID),
		}
		status := strconv.Itoa(p.Status)
		units := strconv.Itoa(p.Units)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			status:` + status + `,
			units:` + units + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateRack(input:", input, ")", testdata.RackResp, "}"}, "")

		var resp struct{ UpdateRack testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateRack.ID)
		require.Equal(t, p.Name, resp.UpdateRack.Name)
		require.Equal(t, p.Status, resp.UpdateRack.Status)
		require.Equal(t, p.Units, resp.UpdateRack.Units)
		require.Equal(t, p.Note, resp.UpdateRack.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteRack(input:{id:"`, p, `"})`, testdata.RackResp, "}"}, "")

		var resp struct{ DeleteRack testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteRack.ID)
		require.NotNil(t, resp.DeleteRack.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := td.ID
			p = append(p, string(strID))
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteRack(input:{ids:["`, ids, `"]})`, testdata.RackResp, "}"}, "")

		var resp struct{ BulkDeleteRack []testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteRack, len(p))
		for _, r := range resp.BulkDeleteRack {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
