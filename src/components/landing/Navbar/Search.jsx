import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const [mobil, setMobil] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mobil");
        if (response.data.success) {
          setMobil(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Mobil");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMobil();
  }, []);

  return (
    <div className="container-fluid bg-white pt-3 px-lg-5">
      <div className="row mx-n2">
        <div className="col-xl-10 col-lg-4 col-md-6 px-2">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <select
              id="select"
              name="mobil_id"
              className="custom-select px-4 mb-3"
              style={{ height: 50 }}
              aria-label="Pilih Mobil"
            >
              <option value="">Pilih Mobil Anda</option>
              {mobil.map((mob) => (
                <option key={mob.id} value={mob.id}>
                  {mob.nama}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-xl-2 col-lg-4 col-md-6 px-2">
          <button
            className="btn btn-primary btn-block mb-3"
            type="button"
            style={{ height: 50 }}
            onClick={handleLoginRedirect}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;