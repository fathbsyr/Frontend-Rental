import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AddReservasi() {
  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_akhir: "",
    pelanggan_id: "",
    status: "",
    mobil_id: "",
  });
  const [pelanggan, setPelanggan] = useState([]);
  const [mobil, setMobil] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const statusOptions = [
    { id: 1, value: "pending", label: "Pending" },
    { id: 2, value: "complete", label: "Complete" },
    { id: 3, value: "cancel", label: "Cancel" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const pelangganResponse = await axios.get(
          "http://localhost:8000/api/pelanggan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPelanggan(pelangganResponse.data.data);
        const mobilResponse = await axios.get(
          "http://localhost:8000/api/mobil",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMobil(mobilResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
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
        "http://localhost:8000/api/reservasi/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        alert("Data Berhasil Dibuat");
        navigate("/admin/reservasi");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="m-3 p-3">
      <h2>Tambah Reservasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tanggal_mulai">Tanggal Mulai</label>
          <input
            id="tanggal_mulai"
            name="tanggal_mulai"
            type="date"
            value={formData.tanggal_mulai}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tanggal_akhir">Tanggal Akhir</label>
          <input
            id="tanggal_akhir"
            name="tanggal_akhir"
            type="date"
            value={formData.tanggal_akhir}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pelanggan_id">Pelanggan</label>
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
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="custom-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Pilih Status</option>
            {statusOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mobil_id">Mobil</label>
          <option value="">Pilih Mobil</option>
          <select
            id="select"
            name="mobil_id"
            className="custom-select"
            value={formData.mobil_id}
            onChange={handleChange}
          >
            <option value="">Pilih Mobil Anda</option>
            {mobil.map((mob) => (
              <option key={mob.id} value={mob.id}>
                {mob.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReservasi;
