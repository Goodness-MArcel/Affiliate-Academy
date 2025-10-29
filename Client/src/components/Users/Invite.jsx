import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"

const Invite = () => {
  return (
    <div>
          <Sidebar />
          <div>
        <h2>Invite Users</h2>
        <p>Share the link below to invite others to join Affiliate Academy:</p>
          </div>
       
       
             
             <div className="footer-space mt-4">
                         <Smallfooter />
                       </div>
           </div>
  )
}

export default Invite
