import axios from "axios";

export interface Location {
  id: string;
  name: string;
  country: string;
}
export interface Campus {
  id: string;
  name: string;
  location: Array<Location>;
}

export interface FetchDestinationsResponse {
  data: {
    getAvailableFiltersForLanguageSearch: {
      campuses: Array<Campus>;
      locations: Array<Location>;
    };
  };
}

const DestinationAPI = {
  fetchAll: async (): Promise<FetchDestinationsResponse> => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/raw/1q1HDFng`
    );
    return response?.data;
  },
};

export default DestinationAPI;
