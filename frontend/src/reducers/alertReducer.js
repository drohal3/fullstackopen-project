import { createSlice } from "@reduxjs/toolkit";
export const AlertTypes = {
  Success: "success",
  Error: "error",
  Warning : "warning",
  Info: "info"
};

// {
//   message: null,
//   alertId: null, //timeoutId
//   type: MessageTypes.None,
// }


const dummyState = [{message: "test", type: AlertTypes.Info, alertId: "1"}]

const initialState = dummyState;

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    // not ideal solution, but for demonstration and practice good enough
    // messageChange(state, action) {
    //   clearTimeout(state.timeoutId);
    //   if (state.timeoutId) {
    //     console.log("cancel timeout", state.timeoutId);
    //     clearTimeout(state.timeoutId);
    //   }
    //   return {
    //     message: action.payload.message,
    //     timeoutId: action.payload.timeoutId,
    //   };
    // },
    add: (state, action) => {

      return state.concat(action.payload)
    },
    remove: (state, action) => {
      return state.filter(alert => alert.alertId !== action.payload.alertId)
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { add, remove, reset } = alertSlice.actions;

// export const setNotification = (message, type, timeout) => {
//   return (dispatch) => {
//     const timeoutId = setTimeout(() => {
//       dispatch(messageReset());
//     }, timeout * 1000);
//     dispatch(messageChange({ message, type, timeoutId }));
//   };
// };


export const addAlert = (message, type, timeout) => {
  return (dispatch) => {
    const alertId = setTimeout(() => {
      dispatch(removeAlert(alertId))
    }, timeout * 1000)

    const alert = {
      message, type, alertId
    }

    dispatch(add(alert))
  }
}

export const removeAlert = (alertId) => {
  return (dispatch) => {
    dispatch(remove({alertId}))
  }
}

export const resetAlerts = () => {
  return (dispatch) => {
    dispatch(reset())
  }
}


export default alertSlice.reducer;