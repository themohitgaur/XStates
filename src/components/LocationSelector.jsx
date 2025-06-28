import  { useEffect, useState } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Failed to fetch countries", err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!selectedCountry) return;

    setStates([]);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error("Failed to fetch states", err));
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedState || !selectedCountry) return;

    setCities([]);
    setSelectedCity("");

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Failed to fetch cities", err));
  }, [selectedState, selectedCountry]);

  return (
    <div style={{  padding: "2rem", borderRadius: "10px", color: "#000", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "1rem", color: "#fff" }}>Select Location</h2>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "10px" }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
        style={{ padding: "0.5rem", marginRight: "10px" }}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        style={{ padding: "0.5rem" }}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {selectedCountry && selectedState && selectedCity && (
        <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
          You selected{" "}
          <span style={{ color: "#000" }}>
            <strong>{selectedCity}</strong>, {selectedState}, {selectedCountry}
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
