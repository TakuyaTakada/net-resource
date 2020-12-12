package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strings"
	"testing"
)

func TestPortQueries(t *testing.T) {
	testData := portTestData

	t.Run("GetSingle", func(t *testing.T) {
		p := string(testData[0].ID)
		q := strings.Join([]string{`query {getPort(input:{id:"`, p, `"})`, testdata.PortResp, "}"}, "")

		var resp struct {
			GetPort testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.GetPort.ID)
		require.Equal(t, testData[0].Name, resp.GetPort.Name)
		require.Equal(t, testData[0].Status, resp.GetPort.Status)
		require.Equal(t, testData[0].Note, resp.GetPort.Note)
	})

	t.Run("GetMultiple", func(t *testing.T) {
		forSearchTestData := testData[5:8]
		q := strings.Join([]string{`query {getPorts(input:{name:"for search"})`, testdata.PortResp, "}"}, "")

		var resp struct {
			GetPorts []testdata.PortRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.GetPorts, len(forSearchTestData))
		for i, r := range resp.GetPorts {
			require.Equal(t, forSearchTestData[i].Name, r.Name)
			require.Equal(t, forSearchTestData[i].Status, r.Status)
			require.Equal(t, forSearchTestData[i].Note, r.Note)
		}
	})
}
