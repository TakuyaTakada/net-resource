import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import SaveIcon from "@material-ui/icons/Save";
import { CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import useStyles from "./Style";
import {
  DialogFields,
  isCheckboxField,
  isSelectorField,
  isTransField,
  isTextField
} from "../../types";
import GraphqlSelector from "../GraphqlSelector/GraphqlSelector";
import GraphqlCheckbox from "../GraphqlCheckbox/GraphqlCheckbox";

type PropsType = {
  id: string;
  updateOpen: boolean;
  handleUpdateClose(): void;
  updateMutation: any;
  updateMutationInput: any;
  handleSetParams(d: {}): {};
  handleUpdateInput(input: { input: {} }): void;
  updateTypename: string;
  handleUpdateDisabled(params: any): boolean;
  detailQuery: any;
  detailTypename: string;
  fields: DialogFields;
};

const UpdateDialog: React.FC<PropsType> = ({
  id,
  updateOpen,
  handleUpdateClose,
  updateMutation,
  updateMutationInput,
  handleSetParams,
  handleUpdateInput,
  handleUpdateDisabled,
  detailQuery,
  detailTypename,
  fields
}): JSX.Element | null => {
  const classes = useStyles();
  const [params, setParams] = useState<any>(updateMutationInput.input);
  const [updateDisabled, setUpdateDisabled] = useState(true);
  useEffect(() => {
    setUpdateDisabled(handleUpdateDisabled(params));
  }, [params, handleUpdateDisabled]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbar = () => {
    enqueueSnackbar("Update succeeded", { variant: "success" });
  };

  const queryInput = { input: { id: id } };

  const [requestUpdate, { loading: updateLoading }] = useMutation(
    updateMutation,
    {
      refetchQueries: [
        {
          query: detailQuery,
          variables: queryInput
        }
      ]
    }
  );
  const onRequestUpdate = () => {
    let newUpdateInput = updateMutationInput;
    newUpdateInput.input.id = id;
    Object.keys(updateMutationInput.input).forEach(key => {
      if (key !== "id") {
        newUpdateInput.input[key] = params[key];
      }
    });
    handleUpdateInput(newUpdateInput);
    requestUpdate({
      variables: updateMutationInput
    });
    handleSnackbar();
    handleUpdateClose();
  };

  const handleParams = (field: string, value: any) => {
    let newParams = params;
    newParams[field] = value;
    setParams(Object.assign({}, newParams));
  };

  const { loading, error, data } = useQuery(detailQuery, {
    variables: queryInput,
    onCompleted: data => {
      setParams(handleSetParams(data));
    }
  });
  if (!updateOpen) return null;
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;
  if (updateLoading)
    return (
      <Backdrop open={updateLoading}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="detail-dialog-title"
      >
        <DialogTitle id="detail-dialog-title">Detail</DialogTitle>
        <DialogContent>
          <List dense={true} disablePadding={true}>
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"ID : "}
                    </Typography>
                    {data[detailTypename].id}
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"Created at : "}
                    </Typography>
                    {data[detailTypename].createdAt}
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"Updated at : "}
                    </Typography>
                    {data[detailTypename].updatedAt}
                  </>
                }
              />
            </ListItem>
          </List>
          <form className={classes.form} noValidate>
            {fields.map((field, idx) => {
              if (isTransField(field)) {
                return (
                  <FormControl key={idx} className={classes.formControl}>
                    <div className={classes.select}>
                      <InputLabel id={`${field.name}-select-label`}>
                        {field.label}
                      </InputLabel>
                      <Select
                        labelId={`${field.name}-select-label`}
                        id={`${field.name}-select`}
                        value={params[field.name]}
                        onChange={event =>
                          handleParams(field.name, event.target.value)
                        }
                        displayEmpty
                        autoWidth
                      >
                        {field.transList.map(({ value, text }, idx) => (
                          <MenuItem key={idx} value={value}>
                            {text}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                );
              } else if (isTextField(field)) {
                if (field.update !== undefined && !field.update) {
                  return (
                    <Typography
                      key={idx}
                      component="span"
                      variant="h6"
                      color="textPrimary"
                      className={classes.inline}
                    >
                      {data[detailTypename][field.name]}
                    </Typography>
                  );
                } else {
                  return (
                    <FormControl key={idx} className={classes.formControl}>
                      <div className={classes.root}>
                        <div>
                          <TextField
                            id={field.name}
                            label={field.label}
                            value={params[field.name]}
                            onChange={event =>
                              handleParams(field.name, event.target.value)
                            }
                            className={classes.textField}
                            variant="outlined"
                            required={field.required}
                            style={
                              field.multiline
                                ? { margin: 8, minWidth: 500 }
                                : {}
                            }
                            multiline={field.multiline}
                            rows={field.rows ? field.rows : 1}
                          />
                        </div>
                      </div>
                    </FormControl>
                  );
                }
              } else if (isSelectorField(field)) {
                return (
                  <FormControl key={idx} className={classes.formControl}>
                    <div className={classes.root}>
                      <GraphqlSelector
                        {...field}
                        value={params[field.name]}
                        handleChange={value => handleParams(field.name, value)}
                      />
                    </div>
                  </FormControl>
                );
              } else if (isCheckboxField(field)) {
                return (
                  <FormControl key={idx} className={classes.formControl}>
                    <div className={classes.root}>
                      <GraphqlCheckbox
                        {...field}
                        checked={params[field.checkedName]}
                        handleChecked={value =>
                          handleParams(field.checkedName, value)
                        }
                      />
                    </div>
                  </FormControl>
                );
              } else {
                return null;
              }
            })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onRequestUpdate}
            color="primary"
            variant="contained"
            disabled={updateDisabled}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button onClick={handleUpdateClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateDialog;
