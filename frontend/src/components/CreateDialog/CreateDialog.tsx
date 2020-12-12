import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
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
import Backdrop from "@material-ui/core/Backdrop";
import SaveIcon from "@material-ui/icons/Save";
import { CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import {
  DialogFields,
  isTransField,
  isTextField,
  isSelectorField,
  isCheckboxField
} from "../../types";
import useStyles from "./Style";
import GraphqlSelector from "../GraphqlSelector/GraphqlSelector";
import GraphqlCheckbox from "../GraphqlCheckbox/GraphqlCheckbox";

type PropsType = {
  createOpen: boolean;
  handleCreateClose(): void;
  createMutation: any;
  createMutationInput: any;
  handleCreateInput(input: { input: {} }): void;
  listQuery: any;
  searchInput: any;
  handleCreateDisabled(params: any): boolean;
  initialCreateInput: {};
  fields: DialogFields;
};

const CreateDialog: React.FC<PropsType> = ({
  createOpen,
  handleCreateClose,
  createMutation,
  createMutationInput,
  handleCreateInput,
  listQuery,
  searchInput,
  handleCreateDisabled,
  initialCreateInput,
  fields
}): JSX.Element | null => {
  const classes = useStyles();
  const [params, setParams] = useState<any>(initialCreateInput);
  const [createDisabled, setCreateDisabled] = useState(true);
  useEffect(() => {
    setCreateDisabled(handleCreateDisabled(params));
  }, [params, handleCreateDisabled]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbar = () => {
    enqueueSnackbar("Create succeeded", { variant: "success" });
  };

  const [requestCreate, { loading: createLoading }] = useMutation(
    createMutation,
    {
      onCompleted: () => {
        setParams(initialCreateInput);
      },
      refetchQueries: [
        {
          query: listQuery,
          variables: searchInput
        }
      ],
      awaitRefetchQueries: true
    }
  );
  const onRequestCreate = () => {
    let newCreateInput = createMutationInput;
    Object.keys(createMutationInput.input).forEach(key => {
      newCreateInput.input[key] = params[key];
    });
    handleCreateInput(newCreateInput);
    requestCreate({
      variables: createMutationInput
    });
    handleSnackbar();
    handleCreateClose();
  };

  const handleParams = (field: string, value: any) => {
    let newParams = params;
    newParams[field] = value;
    setParams(Object.assign({}, newParams));
  };

  if (!createOpen) return null;
  if (createLoading)
    return (
      <Backdrop open={createLoading}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={createOpen}
        onClose={handleCreateClose}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle id="create-dialog-title">Create</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
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
                            field.multiline ? { margin: 8, minWidth: 500 } : {}
                          }
                          multiline={field.multiline}
                          rows={field.rows ? field.rows : 1}
                        />
                      </div>
                    </div>
                  </FormControl>
                );
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
            onClick={onRequestCreate}
            color="primary"
            variant="contained"
            disabled={createDisabled}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button onClick={handleCreateClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateDialog;
