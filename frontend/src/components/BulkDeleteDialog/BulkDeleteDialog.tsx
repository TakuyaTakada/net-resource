import React from "react";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

type PropsType = {
  getSelected(): string[];
  bulkDeleteOpen: boolean;
  handleBulkDeleteClose(): void;
  deleteMutation: any;
  listQuery: any;
  initSelected(): void;
  searchInput: Object;
};

const BulkDeleteDialog: React.FC<PropsType> = ({
  getSelected,
  bulkDeleteOpen,
  handleBulkDeleteClose,
  deleteMutation,
  listQuery,
  initSelected,
  searchInput
}): JSX.Element | null => {
  const { enqueueSnackbar } = useSnackbar();
  const ids = getSelected();

  const handleSnackbar = () => {
    enqueueSnackbar("Delete succeeded", { variant: "warning" });
  };

  const [requestBulkDeleteSites, { loading: deleteLoading }] = useMutation(
    deleteMutation,
    {
      refetchQueries: [
        {
          query: listQuery,
          variables: searchInput
        }
      ]
    }
  );
  const onRequestBulkDeleteSites = () => {
    requestBulkDeleteSites({
      variables: {
        input: {
          ids: ids
        }
      }
    });
    handleSnackbar();
    initSelected();
    handleBulkDeleteClose();
  };
  if (!bulkDeleteOpen) return null;
  if (deleteLoading)
    return (
      <Backdrop open={deleteLoading}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={bulkDeleteOpen}
        onClose={handleBulkDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${ids.length} selected.`}
            <br />
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onRequestBulkDeleteSites}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
          <Button onClick={handleBulkDeleteClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BulkDeleteDialog;
