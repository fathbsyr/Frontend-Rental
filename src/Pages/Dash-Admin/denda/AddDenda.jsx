import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddDenda() {
  const [formData, setFormData] = useState({
    keterangan: "",
    reservasi_id: "",
  });

  const [reservasi, setReservasi] = useState([]); // State to store reservasi data
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  // Fetch data reservasi dari API
  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/reservasi",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setReservasi(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchReservasi();
  }, []);

  // Menghandle perubahan form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Menghandle pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");

      // Validasi apakah reservasi_id diisi
      if (!formData.reservasi_id) {
        return Swal.fire({
          title: "Gagal!",
          text: "Pilih tanggal reservasi terlebih dahulu.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }

      // Kirim data ke backend
      const response = await axios.post(
        "http://localhost:8000/api/denda/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/denda");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data gagal ditambahkan.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan: " + error.message,
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Tambah Denda</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Keterangan</label>
          <div className="input-group">
            <input
              id="text"
              name="keterangan"
              type="text"
              value={formData.keterangan}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Pilihan Reservasi berdasarkan tanggal */}
        <div className="form-group">
          <label htmlFor="reservasi_id">Pilih Tanggal Reservasi</label>
          <div className="input-group">
            <select
              id="reservasi_id"
              name="reservasi_id"
              value={formData.reservasi_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Pilih Reservasi</option>
              {reservasi.length > 0 ? (
                reservasi.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.tanggal_mulai}
                  </option>
                ))
              ) : (
                <option value="">Tidak ada reservasi</option>
              )}
            </select>
          </div>
        </div>

        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDenda;
