import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export function HomePage() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const countries = data?.countries ?? [];

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    emoji: "",
    continent: "",
  });

  const [addCountry, { loading: adding }] = useMutation(ADD_COUNTRY, {
    update(cache, { data }) {
      if (!data) return;
      const newCountry = data.addCountry;
      const existing: any = cache.readQuery({ query: GET_COUNTRIES });
      if (existing && existing.countries) {
        cache.writeQuery({
          query: GET_COUNTRIES,
          data: { countries: [...existing.countries, newCountry] },
        });
      }
    },
    onCompleted: () => setFormData({ name: "", code: "", emoji: "", continent: "" }),
    onError: (err) => console.log(err.message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      name: formData.name,
      code: formData.code,
      emoji: formData.emoji,
      continent: null,
    };
    addCountry({ variables: { data } });
  };

  return (
    <>
      <div className="form-create-div">
        <form className="country-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Country Name"
            required
          />
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Country Code"
            required
          />
          <input
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            placeholder="Country Emoji"
            required
          />
          <select
            name="continent"
            value={formData.continent}
            onChange={handleChange}
          >
            <option value="">-- Aucun --</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
          </select>
          <button className="submit-button" type="submit" disabled={adding}>
            {adding ? "Ajout..." : "Add Country"}
          </button>
        </form>
      </div>
      <h2>Collected countries</h2>
       <hr/>
      {/* Liste des pays */}
      <div className="countries-list">       
        <ul className="countries-ul">
  {loading && <li>Loading...</li>}
  {error && <li>Error: {error.message}</li>}
  {!loading && countries.length === 0 && <li>Aucun pays disponible</li>}
  {!loading &&
    countries.map((c: any) => (
      <li
        key={c.code}
        className="country-item"
        onClick={() => navigate(`/country/${c.code}`)}
      >
        {c.emoji}
        
      </li>
    ))}
</ul>
      </div>
    </>
  );
}
