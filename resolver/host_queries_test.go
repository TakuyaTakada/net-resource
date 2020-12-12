package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestHostQueries(t *testing.T) {
	testData := hostTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getHost(input:{id:"`, p, `"})`, testdata.HostResp, "}"}, "")

		var resp struct {
			GetHost testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetHost.ID)
		require.Equal(t, testData[0].Name, resp.GetHost.Name)
		require.Equal(t, testData[0].Status, resp.GetHost.Status)
		require.Equal(t, testData[0].Protocol, resp.GetHost.Protocol)
		require.Equal(t, testData[0].Note, resp.GetHost.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getHosts(input:{name:"for search"})`, testdata.HostResp, "}"}, "")

		var resp struct {
			GetHosts []testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetHosts, len(forSearchTestData))
		for i, r := range resp.GetHosts {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Status, r.Status)
			require.Equal(t, forSearchTestData[i].Protocol, r.Protocol)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
