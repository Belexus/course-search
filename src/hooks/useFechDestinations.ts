import { useQuery } from "@tanstack/react-query";
import DestinationAPI from "../services/destination";

export const useFetchDestination = () => {
  return useQuery(["destinations"], () => DestinationAPI.fetchAll());
};
