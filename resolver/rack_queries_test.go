package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestRackQueries(t *testing.T) {
	testData := rackTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getRack(input:{id:"`, p, `"})`, testdata.RackResp, "}"}, "")

		var resp struct{ GetRack testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetRack.ID)
		require.Equal(t, testData[0].Name, resp.GetRack.Name)
		require.Equal(t, testData[0].Status, resp.GetRack.Status)
		require.Equal(t, testData[0].Units, resp.GetRack.Units)
		require.Equal(t, testData[0].Note, resp.GetRack.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getRacks(input:{name:"for search"})`, testdata.RackResp, "}"}, "")

		var resp struct{ GetRacks []testdata.RackRespStruct }

		c.MustPost(q, &resp)

		require.Len(t, resp.GetRacks, len(forSearchTestData))
		for i, r := range resp.GetRacks {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Status, r.Status)
			require.Equal(t, forSearchTestData[i].Units, r.Units)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
