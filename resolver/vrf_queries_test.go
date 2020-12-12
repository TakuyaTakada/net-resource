package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestVrfQueries(t *testing.T) {
	testData := vrfTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getVrf(input:{id:"`, p, `"})`, testdata.VrfResp, "}"}, "")

		var resp struct {
			GetVrf testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetVrf.ID)
		require.Equal(t, testData[0].Name, resp.GetVrf.Name)
		require.Equal(t, testData[0].Note, resp.GetVrf.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getVrfs(input:{name:"for search"})`, testdata.VrfResp, "}"}, "")

		var resp struct {
			GetVrfs []testdata.VrfRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetVrfs, len(forSearchTestData))
		for i, r := range resp.GetVrfs {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
