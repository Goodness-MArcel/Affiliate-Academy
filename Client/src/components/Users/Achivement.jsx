import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"

const Achivement = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <h2>Achievements</h2>
      <ul>
        <li>Achievement 1</li>
        <li>Achievement 2</li>
        <li>Achievement 3</li>
      </ul>
      <div className="footer-space mt-4">
        <Smallfooter />
      </div>
      </div>
    </div>
  );
};

export default Achivement;

