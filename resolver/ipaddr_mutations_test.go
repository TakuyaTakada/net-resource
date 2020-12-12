package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestIpaddrMutations(t *testing.T) {
	testData := ipSegmentTestData

	t.Run("Update", func(t *testing.T) {
		ipaddrID := testData[1].Ipaddr[1].ID
		p := struct {
			id     string
			status int
			ipType int
			note   string
		}{
			id:     string(ipaddrID),
			status: 4,
			ipType: 4,
			note:   "test ipaddr updated",
		}
		status := strconv.Itoa(p.status)
		ipType := strconv.Itoa(p.ipType)
		input := `{
			id:"` + p.id + `",
			status:` + status + `,
			type:` + ipType + `,
			note:"` + p.note + `"
		}`
		q := strings.Join([]string{"mutation {updateIpaddr(input:", input, ")", testdata.IpaddrResp, "}"}, "")

		var resp struct {
			UpdateIpaddr testdata.IpaddrRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateIpaddr.ID)
		require.Equal(t, p.status, resp.UpdateIpaddr.Status)
		require.Equal(t, p.ipType, resp.UpdateIpaddr.Type)
		require.Equal(t, p.note, resp.UpdateIpaddr.Note)
	})
}
