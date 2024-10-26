import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HeroInterface } from "../../types/HeroType";
import { AxiosResponse } from "axios";
import axios from "../../axios";
import { resposeInterface } from "../../types/responseType";

type StateType = {
  heroes: {
    items: HeroInterface[];
    isError: boolean;
    isLoading: boolean;
    totalPages: number;
    totalHeroes: number;
    currentPage: number;
  };
  hero: {
    item: HeroInterface | null;
    isError: boolean;
    isLoading: boolean;
  };
};

const initialState: StateType = {
  heroes: {
    items: [],
    isError: false,
    isLoading: true,
    totalPages: 0,
    totalHeroes: 0,
    currentPage: 1,
  },
  hero: {
    item: null,
    isError: false,
    isLoading: true,
  },
};

export const getAllHeroes = createAsyncThunk<
  resposeInterface,
  { page: number; limit: number }
>("hero/getAllHeroes", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<{
      heroes: HeroInterface[];
      totalHeroes: number;
      totalPages: number;
      currentPage: number;
    }> = await axios.get(`/api/heroes?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch heroes");
  }
});

export const getHeroById = createAsyncThunk<HeroInterface, string>(
  "hero/getHeroById",
  async (id, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<HeroInterface> = await axios.get(
        `/api/heroes/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch hero"
      );
    }
  }
);

export const createHero = createAsyncThunk<HeroInterface, Partial<HeroInterface>>(
  "hero/createHero",
  async (body, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<HeroInterface> = await axios.post(
        `/api/heroes`,
        body
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create hero"
      );
    }
  }
);

export const updateHero = createAsyncThunk<HeroInterface, { id: string; updatedFields: Partial<HeroInterface> }>(
  "hero/updateHero",
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<HeroInterface> = await axios.put(
        `/api/heroes/${id}`,
        updatedFields
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update hero"
      );
    }
  }
);

export const deleteHero = createAsyncThunk<void, string>(
  'hero/deleteHero', async (id, {rejectWithValue}) => {
    try {
      await axios.delete(
        `/api/heroes/${id}`
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete hero"
      );
    }
  }
)


const heroSlice = createSlice({
  name: "heroList",
  initialState,
  reducers: {
    setHero: (state, action: PayloadAction<HeroInterface | null>) => {
      state.hero.item = action.payload;
    },
    setHeroes: (state, action: PayloadAction<HeroInterface[]>) => {
      state.heroes.items = action.payload;
    },
    addHero: (state, action: PayloadAction<HeroInterface>) => {
      state.heroes.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHeroes.pending, (state) => {
        state.heroes.isError = false;
        state.heroes.isLoading = true;
      })
      .addCase(
        getAllHeroes.fulfilled,
        (state, action: PayloadAction<resposeInterface>) => {
          state.heroes.isError = false;
          state.heroes.isLoading = false;
          state.heroes.items = action.payload.heroes;
          state.heroes.totalPages = action.payload.totalPages;
          state.heroes.totalHeroes = action.payload.totalHeroes;
          state.heroes.currentPage = action.payload.currentPage;
        }
      )
      .addCase(getAllHeroes.rejected, (state) => {
        state.heroes.isError = true;
        state.heroes.isLoading = false;
        state.heroes.items = [];
      })
      .addCase(getHeroById.pending, (state) => {
        state.hero.isError = false;
        state.hero.isLoading = true;
      })
      .addCase(
        getHeroById.fulfilled,
        (state, action: PayloadAction<HeroInterface>) => {
          state.hero.isError = false;
          state.hero.isLoading = false;
          state.hero.item = action.payload;
        }
      )
      .addCase(getHeroById.rejected, (state) => {
        state.hero.isError = true;
        state.hero.isLoading = false;
        state.hero.item = null;
      });
  },
});

export const { setHero, setHeroes, addHero } = heroSlice.actions;
export default heroSlice.reducer;
