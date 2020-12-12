package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestHostMutations(t *testing.T) {
	testData := hostTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.HostParamStruct{
			Name:     "new test name",
			Status:   1,
			Protocol: 23,
			Note:     "new test note",
		}
		status := strconv.Itoa(p.Status)
		protocol := strconv.Itoa(p.Protocol)
		input := `{
			name:"` + p.Name + `",
			status:` + status + `,
			protocol:` + protocol + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createHost(input:", input, ")", testdata.HostResp, "}"}, "")

		var resp struct {
			CreateHost testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateHost.Name)
		require.Equal(t, p.Status, resp.CreateHost.Status)
		require.Equal(t, p.Protocol, resp.CreateHost.Protocol)
		require.Equal(t, p.Note, resp.CreateHost.Note)
	})

	t.Run("Update", func(t *testing.T) {
		hostID := testData[1].ID
		type updatePramStruct struct {
			testdata.HostParamStruct
			id string
		}
		p := updatePramStruct{
			HostParamStruct: testdata.HostParamStruct{
				Name:     "test name 2 updated",
				Status:   3,
				Protocol: 3389,
				Note:     "test note 2 updated",
			},
			id: string(hostID),
		}
		status := strconv.Itoa(p.Status)
		protocol := strconv.Itoa(p.Protocol)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			status:` + status + `,
			protocol:` + protocol + `,
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateHost(input:", input, ")", testdata.HostResp, "}"}, "")

		var resp struct {
			UpdateHost testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateHost.ID)
		require.Equal(t, p.Name, resp.UpdateHost.Name)
		require.Equal(t, p.Status, resp.UpdateHost.Status)
		require.Equal(t, p.Protocol, resp.UpdateHost.Protocol)
		require.Equal(t, p.Note, resp.UpdateHost.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteHost(input:{id:"`, p, `"})`, testdata.HostResp, "}"}, "")

		var resp struct {
			DeleteHost testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteHost.ID)
		require.NotNil(t, resp.DeleteHost.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := string(td.ID)
			p = append(p, strID)
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteHost(input:{ids:["`, ids, `"]})`, testdata.HostResp, "}"}, "")

		var resp struct {
			BulkDeleteHost []testdata.HostRespStruct
		}

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteHost, len(p))
		for _, r := range resp.BulkDeleteHost {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
