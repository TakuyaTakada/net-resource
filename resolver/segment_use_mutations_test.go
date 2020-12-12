package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestSegmentUseMutations(t *testing.T) {
	testData := segmentUseTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.SegmentUseParamStruct{
			Name: "new test name",
			Note: "new test note",
		}
		input := `{
			name:"` + p.Name + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createSegmentUse(input:", input, ")", testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			CreateSegmentUse testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateSegmentUse.Name)
		require.Equal(t, p.Note, resp.CreateSegmentUse.Note)
	})

	t.Run("Update", func(t *testing.T) {
		hostosID := testData[1].ID
		type updatePramStruct struct {
			testdata.SegmentUseParamStruct
			id string
		}
		p := updatePramStruct{
			SegmentUseParamStruct: testdata.SegmentUseParamStruct{
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
		q := strings.Join([]string{"mutation {updateSegmentUse(input:", input, ")", testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			UpdateSegmentUse testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateSegmentUse.ID)
		require.Equal(t, p.Name, resp.UpdateSegmentUse.Name)
		require.Equal(t, p.Note, resp.UpdateSegmentUse.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteSegmentUse(input:{id:"`, p, `"})`, testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			DeleteSegmentUse testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteSegmentUse.ID)
		require.NotNil(t, resp.DeleteSegmentUse.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteSegmentUse(input:{ids:["`, ids, `"]})`, testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			BulkDeleteSegmentUse []testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteSegmentUse, len(p))
		for _, r := range resp.BulkDeleteSegmentUse {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
