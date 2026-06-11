import { useState, useEffect } from "react";
import { getContacts } from "../services/contactService";
import useAPI from "./useAPI";


function useContacts() {
  const { data, loading, error, refetch } = useAPI(getContacts, true);

  return { contacts: data || [], loading, error, refetch };
}

export default useContacts;
