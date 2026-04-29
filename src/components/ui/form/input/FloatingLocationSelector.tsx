"use client";
import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { FloatingSelect } from "./FloatingSelect";

export function FloatingLocationSelector({
  value,
  onChange,
  t,
}: {
  value: {
    country?: string;
    state?: string;
    city?: string;
  };
  onChange: (v: any) => void;
  t: any;
}) {
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((c) => ({
        label: `${c.flag} ${c.name}`,
        value: c.isoCode,
      })),
    );
  }, []);

  useEffect(() => {
    if (!value.country) return;

    setStates(
      State.getStatesOfCountry(value.country).map((s) => ({
        label: s.name,
        value: s.isoCode,
      })),
    );
  }, [value.country]);

  useEffect(() => {
    if (!value.country || !value.state) return;

    setCities(
      City.getCitiesOfState(value.country, value.state).map((c) => ({
        label: c.name,
        value: c.name,
      })),
    );
  }, [value.country, value.state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FloatingSelect
        label={t("country")}
        options={countries}
        value={countries.find((c) => c.value === value.country)}
        onChange={(c) => {
          onChange({ country: c.value, state: "", city: "" });
        }}
      />

      <FloatingSelect
        label={t("state")}
        options={states}
        value={states.find((s) => s.value === value.state)}
        onChange={(s) => {
          onChange({
            ...value,
            state: s.value,
            city: "",
          });
        }}
        disabled={!value.country}
      />

      <FloatingSelect
        label={t("city")}
        options={cities}
        value={cities.find((c) => c.value === value.city)}
        onChange={(c) => {
          onChange({ ...value, city: c.value });
        }}
        disabled={!value.state}
      />
    </div>
  );
}
