import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
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

export const CountryDetailsPage = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.country) return <p>Pays introuvable</p>;

  const country = data.country;

  return (
    <div className="country-details-page">
    <div className="country-details-container" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div className="country-emoji-details" style={{ fontSize: "5rem" }}>
        {country.emoji}
      </div>
        <h1>{country.name}</h1>
        <p className="text-details"><strong>Code :</strong> {country.code}</p>
        <p className="text-details"><strong>Continent :</strong> {country.continent?.name ?? "—"}</p>
        <button className="submit-button-details" onClick={() => navigate(-1)} style={{ marginLeft: "auto" }}>
        Back to collection
        </button>
      </div>
      </div>
  );
};
