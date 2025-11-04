import AdminSidebar from '../adminLayout/AdminSidebar';
import Smallfooter from "../../Users/UserLayout/smallfooter"
import AdminDashboard from "./AdminDashboard"

const Dashboard = () => {
  return (
    <div>
        <AdminSidebar />
        <AdminDashboard />
        <Smallfooter />
      
    </div>
  )
}

export default Dashboard
