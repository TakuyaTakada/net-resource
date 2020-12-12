package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestSiteQueries(t *testing.T) {
	testData := siteTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getSite(input:{id:"`, p, `"})`, testdata.SiteResp, "}"}, "")

		var resp struct{ GetSite testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetSite.ID)
		require.Equal(t, testData[0].Name, resp.GetSite.Name)
		require.Equal(t, testData[0].Status, resp.GetSite.Status)
		require.Equal(t, testData[0].PostalCode, resp.GetSite.PostalCode)
		require.Equal(t, testData[0].PhoneNumber, resp.GetSite.PhoneNumber)
		require.Equal(t, testData[0].Address, resp.GetSite.Address)
		require.Equal(t, testData[0].Note, resp.GetSite.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getSites(input:{name:"for search"})`, testdata.SiteResp, "}"}, "")

		var resp struct{ GetSites []testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Len(t, resp.GetSites, len(forSearchTestData))
		for i, r := range resp.GetSites {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Status, r.Status)
			require.Equal(t, forSearchTestData[i].PostalCode, r.PostalCode)
			require.Equal(t, forSearchTestData[i].PhoneNumber, r.PhoneNumber)
			require.Equal(t, forSearchTestData[i].Address, r.Address)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
