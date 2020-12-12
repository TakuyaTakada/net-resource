package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestHostOSQueries(t *testing.T) {
	testData := hostosTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getHostOS(input:{id:"`, p, `"})`, testdata.HostOSResp, "}"}, "")

		var resp struct {
			GetHostOS testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetHostOS.ID)
		require.Equal(t, testData[0].Name, resp.GetHostOS.Name)
		require.Equal(t, testData[0].Note, resp.GetHostOS.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getHostOSes(input:{name:"for search"})`, testdata.HostOSResp, "}"}, "")

		var resp struct {
			GetHostOSes []testdata.HostOSRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetHostOSes, len(forSearchTestData))
		for i, r := range resp.GetHostOSes {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
