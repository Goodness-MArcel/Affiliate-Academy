  import Sidebar from "./UserLayout/sidebar"
  import Smallfooter from "./UserLayout/smallfooter"

const Products = () => {
  return (
    <div>
      <Sidebar />
        <div>

          <h2>Products</h2>
        </div>
       

      <div className="footer-space mt-4">
        <Smallfooter />
      </div>
    </div>
  )
}

export default Products
