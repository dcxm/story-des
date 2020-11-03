import React, { Fragment, useState } from "react";

import { connect } from "react-redux";
import deleteItemsAction from "../../store/actions/deleteItemsAction";

import { withRouter } from "react-router-dom";

import { setSnackbarMessage, setSnackbarOpen } from "../../store/actions/snackbarActions";

import DeleteButton from "../buttons/DeleteButton";
import DetailsButton from "../buttons/DetailsButton"
import WriteButton from "../buttons/WriteButton"

const SimpleListActions = withRouter(({ id, type, history, itemName }) => {
  const [isDownloadDialOpen, setIsDownloadDialOpen] = useState(false)

  const editAction = () => {
    history.push(`/shorts/edit/${id}`)
  }

  const detailsAction = () => {
    history.push(`/${type === "short-story" ? "shorts" : "novels"}/${id}`)
  }

  return (
    <Fragment>
        <DetailsButton onClick={detailsAction} />
        {type === "short-story" &&
          <WriteButton onClick={editAction} />
        }
        <DeleteButton
          modelName={type === "novels" ? "novel" : "shortStory"}
          objectName={type === "novels" ? "novels" : "shortStories"}
          itemId={id}
          snackbarMessage={`${itemName} was deleted`}
        />
    </Fragment>
  );
});


const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbarMessage: (payload) => dispatch(setSnackbarMessage(payload)),
    setSnackbarOpen: () => dispatch(setSnackbarOpen()),
    deleteItem: (url, obj, id) => dispatch(deleteItemsAction(url, obj, id))
  }
}

export default connect(null, mapDispatchToProps)(SimpleListActions);
