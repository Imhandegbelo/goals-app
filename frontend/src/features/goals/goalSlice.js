import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalServices";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create a goal
export const createGoal = createAsyncThunk(
  "goal/create",
  async (goalData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await goalServices.addGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add goals
export const getGoals = createAsyncThunk("goal/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalServices.getGoals(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete a goal
export const deleteGoal = createAsyncThunk(
  "goal/delete",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.removeGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit a goal
export const editGoal = createAsyncThunk(
  "goal/edit",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.editGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    // alternative
    // We didnt do it in users because users persist
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGoal.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editGoal.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
    //   .addCase(deleteGoal.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteGoal.fulfilled, (state) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //   })
    //   .addCase(deleteGoal.rejected, (state) => {
    //     state.isError = true;
    //     state.isLoading = false;
    //     state.isSuccess = false;
    //     state.message = action.payload;
    //   });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
