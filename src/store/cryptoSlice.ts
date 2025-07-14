import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyData {
  usd: number;
  usd_24h_change?: number;
}

interface CryptoPrices {
  bitcoin?: CurrencyData;
  ethereum?: CurrencyData;
  ripple?: CurrencyData;
}

interface CryptoState {
  prices: CryptoPrices;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CryptoState = {
  prices: {},
  status: 'idle',
  error: null,
};

export const fetchPrices = createAsyncThunk(
  'crypto/fetchPrices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd&include_24hr_change=true'
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action: PayloadAction<CryptoPrices>) => {
        state.status = 'succeeded';
        state.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch prices';
      });
  },
});

export default cryptoSlice.reducer;