export const initialState = {
  user: {
    userAvailable: false,
    userDetails: {
      userName: 'tej',
      userPhone: 'dhar',
    },
  },
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value;
    }

    /* case 'add_number': {
      return {
        ...state,
        number: action.value + state.number,
      };
    } */

    case 'logged_in': {
      const details = action.value;
      return {
        ...state,

        user: {
          userAvailable: true,
          userDetails: { userName: details.name, userPhone: details.phone },
        },
      };
    }

    case 'logged_out': {
      return {
        ...state,

        user: {
          userAvailable: false,
          userDetails: { userName: null, userPhone: null },
        },
      };
    }
  }
};
