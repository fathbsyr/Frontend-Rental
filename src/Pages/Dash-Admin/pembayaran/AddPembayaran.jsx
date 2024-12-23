import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

function AddPembayaran() {
  const [formData, setFormData] = useState({
    metode: "",
    tanggal_bayar: "",
    status: "",
    pelanggan_id: "",
    reservasi_id: "",
    promosi_id: "",
    denda_id: "",
    total_bayar: "",
  });
  const [promosi, setPromosi] = useState([]);
  const [denda, setDenda] = useState([]);
  const [reservasi, setReservasi] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Opsi metode dan status
  const metodeOptions = [
    { id: 1, value: "transfer", label: "Transfer" },
    { id: 2, value: "cash", label: "Cash" },
  ];
  
  const statusOptions = [
    { id: 1, value: "Belum Lunas", label: "Belum Lunas" },
    { id: 2, value: "Lunas", label: "Lunas" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch data reservasi
        const reservasiResponse = await axios.get("http://localhost:8000/api/reservasi", {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        setReservasi(reservasiResponse.data.data);

        // Fetch data promosi
        const promosiResponse = await axios.get("http://localhost:8000/api/promosi", {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        setPromosi(promosiResponse.data.data);

        // Fetch data denda
        const dendaResponse = await axios.get("http://localhost:8000/api/denda", {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        setDenda(dendaResponse.data.data);
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
      const response = await axios.post("http://localhost:8000/api/pembayaran/create", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Pembayaran berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/pembayaran");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Pembayaran gagal ditambahkan.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text: error.response?.data?.message || "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Tambah Pembayaran</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="metode">Metode</label>
          <select
            id="metode"
            name="metode"
            className="custom-select"
            value={formData.metode}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Metode Pembayaran</option>
            {metodeOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tanggal_bayar">Tanggal Bayar</label>
          <input
            id="tanggal_bayar"
            name="tanggal_bayar"
            type="date"
            value={formData.tanggal_bayar}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="custom-select"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Status Pembayaran</option>
            {statusOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reservasi_id">Reservasi</label>
          <select
            id="reservasi_id"
            name="reservasi_id"
            className="custom-select"
            value={formData.reservasi_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Reservasi</option>
            {reservasi.map((res) => (
              <option key={res.id} value={res.id}>
                {res.tanggal_mulai}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="promosi_id">Diskon</label>
          <select
            id="promosi_id"
            name="promosi_id"
            className="custom-select"
            value={formData.promosi_id}
            onChange={handleChange}
          >
            <option value="">Pilih Diskon</option>
            {promosi.map((disk) => (
              <option key={disk.id} value={disk.id}>
                {disk.diskon}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="denda_id">Denda</label>
          <select
            id="denda_id"
            name="denda_id"
            className="custom-select"
            value={formData.denda_id}
            onChange={handleChange}
          >
            <option value="">Pilih Denda</option>
            {denda.map((den) => (
              <option key={den.id} value={den.id}>
                {den.keterangan}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="total_bayar">Total Bayar</label>
          <input
            id="total_bayar"
            name="total_bayar"
            type="number"
            value={formData.total_bayar}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button
            name="submit"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPembayaran;
