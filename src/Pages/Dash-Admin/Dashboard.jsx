import Mobil from "./mobil/Mobil";
import Ulasan from "./ulasan/Ulasan";
const Dashboard = () => {
  return (
    <div>
      <h1 class="mb-5">Selamat Datang Admin</h1>
    <Mobil/>
    <Ulasan/>
    </div>
  );
};

export default Dashboard;
