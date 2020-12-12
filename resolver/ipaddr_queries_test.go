package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestIpaddrQueries(t *testing.T) {
	testData := ipSegmentTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].Ipaddr[0].ID)
		q := strings.Join([]string{`query {getIpaddr(input:{id:"`, p, `"})`, testdata.IpaddrResp, "}"}, "")

		var resp struct {
			GetIpaddr testdata.IpaddrRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetIpaddr.ID)
		require.Equal(t, string(testData[0].Ipaddr[0].IP), resp.GetIpaddr.IP)
		require.Equal(t, testData[0].Ipaddr[0].Status, resp.GetIpaddr.Status)
		require.Equal(t, testData[0].Ipaddr[0].Type, resp.GetIpaddr.Type)
		require.Equal(t, testData[0].Ipaddr[0].Note, resp.GetIpaddr.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[0].Ipaddr
		q := strings.Join([]string{`query {getIpaddrs(input:{ipSegmentId:"` + string(testData[0].ID) + `",status:1,type:3 })`, testdata.IpaddrResp, "}"}, "")

		var resp struct {
			GetIpaddrs []testdata.IpaddrRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetIpaddrs, len(forSearchTestData)-2)
		for i, r := range resp.GetIpaddrs {
			require.Equal(t, string(forSearchTestData[i+1].IP), r.IP)
			require.Equal(t, forSearchTestData[i+1].Status, r.Status)
			require.Equal(t, forSearchTestData[i+1].Type, r.Type)
			require.Equal(t, forSearchTestData[i+1].Note, r.Note)
		}
	})
}
