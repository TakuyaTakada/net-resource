package testdata

type IpaddrRespStruct struct {
	ID        string
	CreatedAt string
	UpdatedAt string
	DeletedAt *string
	IPSegment string
	IP        string
	Status    int
	Type      int
	Note      string
}

var IpaddrResp = `{ id createdAt updatedAt deletedAt ip status type note }`
