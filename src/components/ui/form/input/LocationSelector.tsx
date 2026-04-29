"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

type Option = {
  label: string;
  value: string;
};

interface LocationSelectorProps {
  value?: {
    country?: string;
    state?: string;
    city?: string;
  };
  onChange?: (data: {
    country?: string;
    state?: string;
    city?: string;
  }) => void;
}

export default function LocationSelector({
  value,
  onChange,
}: LocationSelectorProps) {
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);

  const [country, setCountry] = useState<Option | null>(null);
  const [state, setState] = useState<Option | null>(null);
  const [city, setCity] = useState<Option | null>(null);

  useEffect(() => {
    const data = Country.getAllCountries().map((c) => ({
      label: `${c.flag} ${c.name}`,
      value: c.isoCode,
    }));
    setCountries(data);
  }, []);

  useEffect(() => {
    if (!country) {
      setStates([]);
      setState(null);
      return;
    }

    const data = State.getStatesOfCountry(country.value).map((s) => ({
      label: s.name,
      value: s.isoCode,
    }));

    setStates(data);
    setState(null);
    setCities([]);
    setCity(null);
  }, [country]);

  useEffect(() => {
    if (!country || !state) {
      setCities([]);
      setCity(null);
      return;
    }

    const data = City.getCitiesOfState(country.value, state.value).map((c) => ({
      label: c.name,
      value: c.name,
    }));

    setCities(data);
    setCity(null);
  }, [state]);

  useEffect(() => {
    onChange?.({
      country: country?.value,
      state: state?.value,
      city: city?.value,
    });
  }, [country, state, city]);

  return (
    <div className="space-y-5">
      {/* Country */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">Country</label>
        <Select
          options={countries}
          value={country}
          onChange={(val) => setCountry(val)}
          placeholder="Select your country"
          className="react-select-container "
          classNamePrefix="react-select"
          isClearable
        />
        <p className="text-xs text-gray-500 mt-1">
          Choose your primary country of residence
        </p>
      </div>

      {/* State */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">
          State / Province
        </label>
        <Select
          options={states}
          value={state}
          onChange={(val) => setState(val)}
          placeholder={country ? "Select your state" : "Select country first"}
          isDisabled={!country}
          className="react-select-container"
          classNamePrefix="react-select"
          isClearable
        />
        <p className="text-xs text-gray-500 mt-1">
          Administrative region or province
        </p>
      </div>

      {/* City */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">City</label>
        <Select
          options={cities}
          value={city}
          onChange={(val) => setCity(val)}
          placeholder={state ? "Select your city" : "Select state first"}
          isDisabled={!state}
          className="react-select-container"
          classNamePrefix="react-select"
          isClearable
        />
        <p className="text-xs text-gray-500 mt-1">
          Nearest metropolitan area or town
        </p>
      </div>
    </div>
  );
}
