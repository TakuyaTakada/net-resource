package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestIpSegmentQueries(t *testing.T) {
	testData := ipSegmentTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getIpSegment(input:{id:"`, p, `"})`, testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			GetIpSegment testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetIpSegment.ID)
		require.Equal(t, string(testData[0].IPSegment), resp.GetIpSegment.IPSegment)
		require.Equal(t, testData[0].Note, resp.GetIpSegment.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getIpSegments(input:{ipSegment:"172.16.1"})`, testdata.IpSegmentResp, "}"}, "")

		var resp struct {
			GetIpSegments []testdata.IpSegmentRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetIpSegments, len(forSearchTestData))
		for i, r := range resp.GetIpSegments {
			require.Equal(t, string(forSearchTestData[i].IPSegment), r.IPSegment)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
