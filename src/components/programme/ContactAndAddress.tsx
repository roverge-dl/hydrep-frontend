import { useEffect, useState } from "react";
import type { StepChildProps } from "../../types/programFormData";
import Input from "../forms/Input";
import Select from "../forms/Select";
import {
  getCommunities,
  getLgas,
  getStates,
} from "../../services/api/applicationService";

const ContactAndAddress: React.FC<StepChildProps> = ({
  formData,
  handleInputChange,
  fieldErrors,
}) => {
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [lgas, setLgas] = useState<{ label: string; value: string }[]>([]);
  const [communities, setCommunities] = useState<
    { label: string; value: string }[]
  >([]);

  // 1. Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStates();

        // Access response.data because your JSON wraps the array in a 'data' field
        if (response.status === "success") {
          const formattedStates = response.data.map((s: any) => ({
            label: s.name,
            value: s.id.toString(), // The ID needed for getLgas(id)
          }));
          setStates(formattedStates);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // 2. Fetch LGAs when state changes
  useEffect(() => {
    if (!formData.state) {
      setLgas([]);
      return;
    }
    const fetchLgas = async () => {
      try {
        const response = await getLgas(formData.state);
        if (response.status === "success") {
          setLgas(
            response.data.map((l: any) => ({ label: l.name, value: l.id })),
          );
        }
      } catch (err) {
        console.error("Error fetching LGAs", err);
      }
    };
    fetchLgas();
  }, [formData.state]);

  // 3. Fetch Communities when LGA changes
  useEffect(() => {
    if (!formData.lga) {
      setCommunities([]);
      return;
    }
    const fetchComms = async () => {
      try {
        const response = await getCommunities(formData.lga);
        if (response.status === "success") {
          console.log(response.data);
          setCommunities(
            response.data.map((c: any) => ({ label: c.name, value: c.id })),
          );
        }
      } catch (err) {
        console.error("Error fetching communities", err);
      }
    };
    fetchComms();
  }, [formData.lga]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-8 gap-x-4 mobilelg:gap-y-6 gap-y-4">
        {/* Field: First Name */}
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

        {/* Field: Last Name */}
        <div className="space-y-1.5 sm:col-span-1 col-span-2 ">
          <Input
            label="Email Address"
            labelClass="text-start"
            name="email"
            type="text"
            placeholder="email@example.com"
            value={formData.lastName}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.lastName}
          />
        </div>

        {/* Field: Middle Name */}
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

        {/* Field: State */}
        <div className="space-y-1.5 sm:col-span-1 col-span-2">
          <Select
            label="State"
            placeholder="Select state"
            value={formData.state}
            name="state"
            onChange={handleInputChange}
            error={fieldErrors.state}
            options={states}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-1 col-span-2">
          <Select
            label="LGA"
            placeholder="Select LGA"
            value={formData.lga}
            name="lga"
            onChange={handleInputChange}
            error={fieldErrors.lga}
            options={lgas}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-1 col-span-2">
          <Select
            label="Community"
            placeholder="Select state"
            value={formData.community}
            name="community"
            onChange={handleInputChange}
            error={fieldErrors.community}
            options={communities}
          />
        </div>
      </div>
    </>
  );
};

export default ContactAndAddress;
