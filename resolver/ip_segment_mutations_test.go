package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestIpSegmentMutations(t *testing.T) {
	testData := ipSegmentTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.IpSegmentParamStruct{
			IPSegment: "192.168.1.0/28",
			Note:      "new test note",
		}
		input := `{
			ipSegment:"` + p.IPSegment + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createIpSegment(input:", input, ")", testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			CreateIpSegment testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.IPSegment, resp.CreateIpSegment.IPSegment)
		require.Equal(t, p.Note, resp.CreateIpSegment.Note)
	})

	t.Run("Update", func(t *testing.T) {
		ipSegmentID := testData[1].ID
		type updatePramStruct struct {
			testdata.IpSegmentParamStruct
			id string
		}
		p := updatePramStruct{
			IpSegmentParamStruct: testdata.IpSegmentParamStruct{
				Note: "test note 2 updated",
			},
			id: string(ipSegmentID),
		}
		input := `{
			id:"` + p.id + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateIpSegment(input:", input, ")", testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			UpdateIpSegment testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateIpSegment.ID)
		require.Equal(t, p.Note, resp.UpdateIpSegment.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteIpSegment(input:{id:"`, p, `"})`, testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			DeleteIpSegment testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteIpSegment.ID)
		require.NotNil(t, resp.DeleteIpSegment.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteIpSegment(input:{ids:["`, ids, `"]})`, testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			BulkDeleteIpSegment []testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteIpSegment, len(p))
		for _, r := range resp.BulkDeleteIpSegment {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
