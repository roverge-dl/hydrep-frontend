/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { StepChildProps } from "../../types/programFormData";
import Input from "../forms/Input";
import SearchableSelect from "../forms/Select"; // Your custom component
import { useAuth } from "../../context/AuthContext";
import {
  getCommunities,
  getLgas,
  getStates,
} from "../../services/api/applicationService";

const ContactAndAddress: React.FC<StepChildProps> = ({
  formData,
  setFormData,
  handleInputChange,
  fieldErrors,
  setUserData,
}) => {

    const { user } = useAuth();
  // --- State for Dropdown Options ---
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [lgas, setLgas] = useState<{ label: string; value: string }[]>([]);
  const [communities, setCommunities] = useState<{ label: string; value: string }[]>([]);

  // --- Loading Indicators for UX ---
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [loadingCommunities, setLoadingCommunities] = useState(false);

  // 1. FETCH STATES (Runs once on mount)
  // This populates the State dropdown. If formData.state has an ID (e.g., "5"),
  // SearchableSelect will automatically match it to the correct label (e.g., "Bauchi").
  useEffect(() => {
    let mounted = true;
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await getStates();
        if (mounted && response.status === "success") {
          // Transform API data to { label, value } format
          setStates(
            response.data.map((s: any) => ({
              label: s.name,
              value: s.id.toString(),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        if (mounted) setLoadingStates(false);
      }
    };
    fetchStates();
    return () => { mounted = false; };
  }, []);

  // 2. FETCH LGAs (Runs when State ID exists or changes)
  // This handles two scenarios:
  // a) Initial Load: If formData.state is prefilled, this runs immediately to fetch LGAs.
  // b) User Selection: If user picks a new state, this runs to fetch new LGAs.
  useEffect(() => {
    let mounted = true;
    const stateId = formData.state === "" ? user?.user.state_id : formData.state;

    // If no state is selected, clear LGAs and stop.
    if (!stateId || stateId === "") {
      setLgas([]);
      return;
    }

    const fetchLgas = async () => {
      setLoadingLgas(true);
      try {
        const response = await getLgas(stateId);
        console.log('lga res', response)
        if (mounted && response.status === "success") {
          setLgas(
            response.data.map((l: any) => ({
              label: l.name,
              value: l.id.toString(),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching LGAs", err);
      } finally {
        if (mounted) setLoadingLgas(false);
      }
    };

    fetchLgas();
    return () => { mounted = false; };
  }, [formData.state, user?.user.state_id]); 

  // 3. FETCH COMMUNITIES (Runs when LGA ID exists or changes)
  // Similar logic to LGAs. Handles prefill and user selection.
  useEffect(() => {
    let mounted = true;
    const lgaId = formData.lga === "" ? user?.user.lga_id : formData.lga;

    if (!lgaId) {
      setCommunities([]);
      return;
    }

    const fetchComms = async () => {
      setLoadingCommunities(true);
      try {
        const response = await getCommunities(lgaId);
        if (mounted && response.status === "success") {
          setCommunities(
            response.data.map((c: any) => ({
              label: c.name,
              value: c.id.toString(),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching communities", err);
      } finally {
        if (mounted) setLoadingCommunities(false);
      }
    };

    fetchComms();
    return () => { mounted = false; };
  }, [formData.lga]);

  useEffect(() => {
    const ustate = states.find((s) => s.value == user?.user?.state_id)
    console.log('user state', ustate?.label);
    setFormData((prev: any) => ({ ...prev, state: ustate?.value }));
    if (setUserData) {
      setUserData((prev: any) => ({ ...prev, state: ustate?.label }));
    }
  }, [states, user, setFormData, setUserData])

   useEffect(() => {
    const ulga = lgas.find((s) => s.value == user?.user?.lga_id)
    console.log('user lga', ulga?.label);
    setFormData((prev: any) => ({ ...prev, lga: ulga?.value }));
    if (setUserData) {
      setUserData((prev: any) => ({ ...prev, lga: ulga?.label }));
    }
  }, [lgas, user, setFormData, setUserData])

   useEffect(() => {
    const ucommunity = communities.find((s) => s.value == user?.user?.community_id)
    console.log('user community', ucommunity?.label);
    setFormData((prev: any) => ({ ...prev, community: ucommunity?.value }));
    if (setUserData) {
      setUserData((prev: any) => ({ ...prev, community: ucommunity?.label }));
    }
  }, [communities, user, setFormData, setUserData])

  // When user manually changes State, we must reset LGA and Community
  // to prevent invalid combinations (e.g., Lagos State with a Kano LGA).
  const handleStateChange = (e: any) => {
    handleInputChange(e); 
    setFormData((prev: any) => ({ ...prev, lga: "", community: "" }));
  };

  // When user manually changes LGA, reset Community.
  const handleLgaChange = (e: any) => {
    handleInputChange(e); 
    setFormData((prev: any) => ({ ...prev, community: "" }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-8 gap-x-4 mobilelg:gap-y-6 gap-y-4">
      {/* Phone Field */}
      <div className="space-y-1.5 sm:col-span-1 col-span-2">
        <Input
          label="Phone Number"
          labelClass="text-start"
          name="phone"
          type="tel"
          placeholder="08XXXXXXXXX"
          value={formData.phone}
          onChange={handleInputChange}
          className="pl-4"
          error={fieldErrors.phone}
        />
      </div>

      {/* Email Field */}
      <div className="space-y-1.5 sm:col-span-1 col-span-2">
        <Input
          label="Email Address"
          labelClass="text-start"
          name="email"
          type="text"
          placeholder="email@example.com"
          disabled
          value={formData.email}
          onChange={handleInputChange}
          className="pl-4 bg-gray-50 cursor-not-allowed"
          error={fieldErrors.email}
        />
      </div>

      {/* Address Field */}
      <div className="space-y-1.5 col-span-2">
        <Input
          label="Street Address"
          labelClass="text-start"
          name="address"
          type="text"
          placeholder="Enter street address"
          value={formData.address}
          onChange={handleInputChange}
          className="pl-4"
          error={fieldErrors.address}
        />
      </div>

      {/* --- State Selection --- */}
      <div className="space-y-1.5 sm:col-span-1 col-span-2">
        <SearchableSelect
          label="State"
          name="state"
          value={formData.state} 
          options={states}
          onChange={handleStateChange} 
          placeholder={loadingStates ? "Loading states..." : "Select State"}
          disabled={loadingStates}
          error={fieldErrors.state}
        />
      </div>

      {/* --- LGA Selection --- */}
      <div className="space-y-1.5 sm:col-span-1 col-span-2">
        <SearchableSelect
          label="LGA"
          name="lga"
          value={formData.lga}
          options={lgas}
          onChange={handleLgaChange} 
          placeholder={loadingLgas ? "Loading LGAs..." : "Select LGA"}
          disabled={loadingLgas}
          error={fieldErrors.lga}
        />
      </div>

      {/* --- Community Selection --- */}
      <div className="space-y-1.5 sm:col-span-1 col-span-2">
        <SearchableSelect
          label="Community"
          name="community"
          value={formData.community}
          options={communities}
          onChange={handleInputChange} 
          placeholder={loadingCommunities ? "Loading communities..." : "Select Community"}
          disabled={loadingCommunities}
          error={fieldErrors.community}
        />
      </div>
    </div>
  );
};

export default ContactAndAddress;