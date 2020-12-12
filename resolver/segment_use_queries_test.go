package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestSegmentUseQueries(t *testing.T) {
	testData := segmentUseTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getSegmentUse(input:{id:"`, p, `"})`, testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			GetSegmentUse testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetSegmentUse.ID)
		require.Equal(t, testData[0].Name, resp.GetSegmentUse.Name)
		require.Equal(t, testData[0].Note, resp.GetSegmentUse.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getSegmentUses(input:{name:"for search"})`, testdata.SegmentUseResp, "}"}, "")

		var resp struct {
			GetSegmentUses []testdata.SegmentUseRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetSegmentUses, len(forSearchTestData))
		for i, r := range resp.GetSegmentUses {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
