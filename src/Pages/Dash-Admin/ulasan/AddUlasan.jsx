import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddUlasan() {
  const [formData, setFormData] = useState({
    komentar: "",
    pelanggan_id: "",
  });
  const [pelanggan, setPelanggan] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const token = localStorage.getItem("token");
        const pelangganResponse = await axios.get(
          "http://localhost:8000/api/pelanggan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPelanggan(pelangganResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPelanggan();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/ulasan/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        alert("Data Berhasil Ditambahkan");
        navigate("/admin/ulasan");
      } else {
        setError("Gagal Menambahkan personel");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="m-5 p-3">
      <h2>Tambah Ulasan</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Komentar</label>
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              id="text"
              name="komentar"
              type="text"
              value={formData.komentar}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="select">Pelanggan</label>
          <div>
            <select
              id="select"
              name="pelanggan_id"
              className="custom-select"
              value={formData.pelanggan_id}
              onChange={handleChange}
            >
              <option value="">Pilih Nama Anda</option>
              {pelanggan.map((pel) => (
                <option key={pel.id} value={pel.id}>
                  {pel.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <button
            name="submit"
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddUlasan;