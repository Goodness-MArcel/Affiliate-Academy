import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"


const Estates = () => {
  return (
    <div>
      <Sidebar />
      <div>

        <h2>Estates</h2>
        <p>Manage your estates and view details about each property.</p>
      </div>


      
      <div className="footer-space mt-4">
                  <Smallfooter />
                </div>
    </div>
  )
}

export default Estates

   