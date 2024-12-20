import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddReservasi() {
    const [reservasi, setReservasi] = useState({
      tanggal_mulai: "",
      tanggal_akhir: "",
      pelanggan_id: "",
      status: "",
      mobil_id: "",
    });
  
    const navigate = useNavigate();
    const statusOptions = [
      { id: 1, value: "pending", label: "Pending" },
      { id: 2, value: "complete", label: "Complete" },
      { id: 3, value: "cancel", label: "Cancel" },
    ];
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8000/api/reservasi/create",
          reservasi,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          alert("Reservasi Berhasil");
          navigate("/admin/reservasi");
        } else {
          alert("Gagal Menambahkan Reservasi");
        }
      } catch (err) {
        alert("Terjadi kesalahan, silahkan coba lagi");
        console.error(err);
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
              value={reservasi.tanggal_mulai}
              onChange={(e) => setReservasi({ ...reservasi, tanggal_mulai: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tanggal_akhir">Tanggal Akhir</label>
            <input
              id="tanggal_akhir"
              name="tanggal_akhir"
              type="date"
              value={reservasi.tanggal_akhir}
              onChange={(e) => setReservasi({ ...reservasi, tanggal_akhir: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pelanggan_id">Pelanggan</label>
            <input
              id="pelanggan_id"
              name="pelanggan_id"
              type="text"
              value={reservasi.pelanggan_id}
              onChange={(e) => setReservasi({ ...reservasi, pelanggan_id: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="custom-select"
              value={reservasi.status}
              onChange={(e) => setReservasi({ ...reservasi, status: e.target.value })}
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
            <input
              id="mobil_id"
              name="mobil_id"
              type="text"
              value={reservasi.mobil_id}
              onChange={(e) => setReservasi({ ...reservasi, mobil_id: e.target.value })}
              className="form-control"
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
  
  export default AddReservasi;
  