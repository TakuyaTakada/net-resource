package resolver

import (
	"github.com/taktakty/netlabi/testdata"
	"github.com/stretchr/testify/require"
	"strconv"
	"strings"
	"testing"
)

func TestSiteMutations(t *testing.T) {
	testData := siteTestData

	t.Run("Create", func(t *testing.T) {
		p := testdata.SiteParamStruct{
			Name:        "new test name",
			Status:      1,
			PostalCode:  "123-1234",
			PhoneNumber: "123-1234-1234",
			Address:     "new test address",
			Note:        "new test note",
		}
		status := strconv.Itoa(p.Status)
		input := `{
			name:"` + p.Name + `",
			status:` + status + `,
			postalCode:"` + p.PostalCode + `",
			phoneNumber:"` + p.PhoneNumber + `",
			address:"` + p.Address + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {createSite(input:", input, ")", testdata.SiteResp, "}"}, "")

		var resp struct{ CreateSite testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p.Name, resp.CreateSite.Name)
		require.Equal(t, p.Status, resp.CreateSite.Status)
		require.Equal(t, p.PostalCode, resp.CreateSite.PostalCode)
		require.Equal(t, p.PhoneNumber, resp.CreateSite.PhoneNumber)
		require.Equal(t, p.Address, resp.CreateSite.Address)
		require.Equal(t, p.Note, resp.CreateSite.Note)
	})

	t.Run("Update", func(t *testing.T) {
		siteID := testData[1].ID
		type updatePramStruct struct {
			testdata.SiteParamStruct
			id string
		}
		p := updatePramStruct{
			SiteParamStruct: testdata.SiteParamStruct{
				Name:        "test name 2 updated",
				Status:      2,
				PostalCode:  "123-4567",
				PhoneNumber: "123-4567-8901",
				Address:     "test address 2 updated",
				Note:        "test note 2 updated",
			},
			id: string(siteID),
		}
		status := strconv.Itoa(p.Status)
		input := `{
			id:"` + p.id + `",
			name:"` + p.Name + `",
			status:` + status + `,
			postalCode:"` + p.PostalCode + `",
			phoneNumber:"` + p.PhoneNumber + `",
			address:"` + p.Address + `",
			note:"` + p.Note + `"
		}`
		q := strings.Join([]string{"mutation {updateSite(input:", input, ")", testdata.SiteResp, "}"}, "")

		var resp struct{ UpdateSite testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p.id, resp.UpdateSite.ID)
		require.Equal(t, p.Name, resp.UpdateSite.Name)
		require.Equal(t, p.Status, resp.UpdateSite.Status)
		require.Equal(t, p.PostalCode, resp.UpdateSite.PostalCode)
		require.Equal(t, p.PhoneNumber, resp.UpdateSite.PhoneNumber)
		require.Equal(t, p.Address, resp.UpdateSite.Address)
		require.Equal(t, p.Note, resp.UpdateSite.Note)
	})

	t.Run("Delete", func(t *testing.T) {
		p := string(testData[2].ID)
		q := strings.Join([]string{`mutation {deleteSite(input:{id:"`, p, `"})`, testdata.SiteResp, "}"}, "")

		var resp struct{ DeleteSite testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Equal(t, p, resp.DeleteSite.ID)
		require.NotNil(t, resp.DeleteSite.DeletedAt)
	})

	t.Run("BulkDelete", func(t *testing.T) {
		var p []string
		for _, td := range testData[3:5] {
			strID := td.ID
			p = append(p, string(strID))
		}
		ids := strings.Join(p, `","`)
		q := strings.Join([]string{`mutation {bulkDeleteSite(input:{ids:["`, ids, `"]})`, testdata.SiteResp, "}"}, "")

		var resp struct{ BulkDeleteSite []testdata.SiteRespStruct }

		c.MustPost(q, &resp)

		require.Len(t, resp.BulkDeleteSite, len(p))
		for _, r := range resp.BulkDeleteSite {
			require.NotNil(t, r.DeletedAt)
		}
	})
}
