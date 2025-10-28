import React from 'react'
import { Link } from 'react-router-dom'

const year = new Date().getFullYear();

const Smallfooter = () => {
  return (
    <div className="d-flex justify-content-end align-items-center flex-wrap gap-3 py-3 px-3 border-top">
      <p className="mb-0 text-dark small">© {year} AffiliateAcademy. All rights reserved.</p>
      <div className="d-flex gap-3">
        <Link to="#" className="text-muted"><i className="bi bi-facebook"></i></Link>
        <Link to="#" className="text-muted"><i className="bi bi-twitter"></i></Link>
        <Link to="#" className="text-muted"><i className="bi bi-linkedin"></i></Link>
        <Link to="#" className="text-muted"><i className="bi bi-instagram"></i></Link>
        <Link to="#" className="text-muted"><i className="bi bi-youtube"></i></Link>
        <Link to="#" className="text-muted"><i className="bi bi-tiktok"></i></Link>
      </div>
    </div>
  )
}

export default Smallfooter


