import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditPembayaran() {
  const [formData, setFormData] = useState({
    metode: "",
    tanggal_bayar: "",
    status: "",
    reservasi_id: "",
    promosi_id: "",
    denda_id: "",
    total_bayar: "",
  });

  const [reservasi, setReservasi] = useState([]);
  const [promosi, setPromosi] = useState([]);
  const [denda, setDenda] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const metodeOptions = [
    { id: 1, value: "transfer", label: "Transfer" },
    { id: 2, value: "cash", label: "Cash" },
  ];

  const statusOptions = [
    { id: 1, value: "Belum Lunas", label: "Belum Lunas" },
    { id: 2, value: "Lunas", label: "Lunas" },
  ];

  useEffect(() => {
    if (!id) {
      setError("ID pembayaran tidak ditemukan");
      return;
    }
    const fetchEditPembayaran = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/pembayaran-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          console.log(response.data.data); // Debug data di konsol
          setFormData({
            metode: response.data.data[0].metode || "",
            tanggal_bayar: response.data.data[0].tanggal_bayar || "",
            status: response.data.data[0].status || "",
            reservasi_id: response.data.data[0].reservasi_id || "",
            promosi_id: response.data.data[0].promosi_id || "",
            denda_id: response.data.data[0].denda_id || "",
            total_bayar: response.data.data[0].total_bayar || "",
          });
        } else {
          setError("Data pembayaran tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch data reservasi
        const reservasiResponse = await axios.get(
          "http://localhost:8000/api/reservasi",
          {
            headers: { "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservasi(reservasiResponse.data.data);

        // Fetch data promosi
        const promosiResponse = await axios.get(
          "http://localhost:8000/api/promosi",
          {
            headers: { "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`
            },
          }
        );
        setPromosi(promosiResponse.data.data);

        // Fetch data denda
        const dendaResponse = await axios.get(
          "http://localhost:8000/api/denda",
          {
            headers: { "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`
            },
          }
        );
        setDenda(dendaResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
    fetchEditPembayaran();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/pembayaran/${id}`,
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
          text: "Data berhasil diubah",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/pembayaran");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data pembayaran gagal diubah",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text:
          error.response?.data?.message ||
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Edit Pembayaran</h2>
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
          <button name="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditPembayaran;
