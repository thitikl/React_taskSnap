import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const Popup = styled(Dialog)();

function PopUpTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

PopUpTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const statusOptions = ["plan", "ongoing", "finished"];

export default function CustomizedDialogs({ open, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Popup
      onClose={onClose}
      open={open}
    >
      <PopUpTitle onClose={onClose}>
        Edit Task
      </PopUpTitle>
      <DialogContent className="dialog-content">
        <FormControl>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            value={editedTask.title || ""}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <h3>Status</h3>
          <Select
            name="status"
            value={editedTask.status || ""}
            onChange={handleInputChange}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </Popup>
  );
}

CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};
