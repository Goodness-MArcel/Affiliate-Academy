import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./UserLayout/sidebar";
import Smallfooter from "./UserLayout/smallfooter";
import { useUser } from "../../context/userContext";
import { countries } from "../pages/userCountries";
import { supabase } from "../../../supabase";
import "./Css/Dashboard.css";

const Profile = () => {
  const { user, profile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  // Initialize form data with user profile data
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    home_address: "",
    country: "",
    account_number: "",
    bank_name: "",
  });

  // Update form data whenever profile data changes
  useEffect(() => {
    if (profile || user) {
      console.log('Profile data loaded:', profile);
      setFormData({
        full_name: String(profile?.full_name || ""),
        email: String(profile?.email || user?.email || ""),
        phone_number: String(profile?.phone_number || ""),
        home_address: String(profile?.home_address || ""),
        country: String(profile?.country || ""),
        account_number: String(profile?.account_number || ""),
        bank_name: String(profile?.bank_name || ""),
      });
    }
  }, [profile, user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    // Basic validation
    if (!String(formData.full_name || "").trim()) {
      setMessage({ text: "Full name is required", type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: String(formData.full_name || "").trim(),
          phone_number: String(formData.phone_number || "").trim(),
          home_address: String(formData.home_address || "").trim(),
          country: formData.country || "",
          account_number: String(formData.account_number || "").trim(),
          bank_name: String(formData.bank_name || "").trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      console.log('Profile updated successfully in database');
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
      
      // Force a small delay and reload to ensure fresh data from database
      setTimeout(() => {
        console.log('Reloading page to refresh profile data');
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ text: error.message || "Failed to update profile", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ text: "Please select a valid image file (JPEG, PNG, or WebP)", type: "error" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setMessage({ text: "Image size must be less than 5MB", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "Uploading avatar...", type: "success" });

    try {
      // Delete existing avatar if it exists
      if (profile?.avatar_url && profile.avatar_url.includes('supabase')) {
        const oldFileName = profile.avatar_url.split('/').pop();
        await supabase.storage.from('avatars').remove([oldFileName]);
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // If avatars bucket doesn't exist, try to create it or use a different approach
        if (uploadError.message.includes('not found')) {
          throw new Error('Avatar storage not configured. ');
        }
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setMessage({ text: "Avatar updated successfully!", type: "success" });
      
      // Refresh to show new avatar and updated profile data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Avatar upload error:', error);
      setMessage({ 
        text: error.message || "Failed to upload avatar. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Copy referral link
  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${user?.id}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setMessage({ text: "Referral link copied!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    });
  };

  // Get avatar URL
  const getAvatarUrl = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.full_name || user?.email || 'User'
    )}&background=198754&color=fff&size=120`;
  };

  return (
    <div className="dashboard-container d-flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-main">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white border-0 pb-0">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h4 className="mb-0 fw-bold">My Profile</h4>
                    {!isEditing ? (
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit Profile
                      </button>
                    ) : (
                      <div className="d-flex gap-2 flex-wrap">
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            setIsEditing(false);
                            setMessage({ text: "", type: "" });
                            // Reset form data to current profile values from database
                            setFormData({
                              full_name: String(profile?.full_name || ""),
                              email: String(profile?.email || user?.email || ""),
                              phone_number: String(profile?.phone_number || ""),
                              home_address: String(profile?.home_address || ""),
                              country: String(profile?.country || ""),
                              account_number: String(profile?.account_number || ""),
                              bank_name: String(profile?.bank_name || ""),
                            });
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg me-2"></i>
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-body p-4">
                  {/* Alert Messages */}
                  {message.text && (
                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                      <i className={`bi ${message.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                      {message.text}
                      <button type="button" className="btn-close" onClick={() => setMessage({ text: "", type: "" })}></button>
                    </div>
                  )}

                  {/* Profile Layout - Landscape on larger screens */}
                  <div className="row">
                    {/* Avatar Section - Left side on desktop */}
                    <div className="col-12 col-lg-4">
                      <div className="text-center mb-4 pb-4 border-bottom border-lg-0 border-lg-end pe-lg-4">
                        <div className="position-relative d-inline-block">
                          <i
                            src={getAvatarUrl()}
                            alt="User Avatar"
                            className="rounded-circle shadow-sm"
                            width="120"
                            height="120"
                            style={{ objectFit: 'cover' }}
                          />
                          <button 
                            className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle p-2"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            title="Change Avatar"
                          >
                            <i className="bi bi-camera"></i>
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                        />
                        <div className="mt-3">
                          <button 
                            className="btn btn-outline-success btn-sm w-100"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                          >
                            <i className="bi bi-upload me-2"></i>
                            Change Picture
                          </button>
                        </div>

                        {/* User Info Summary - Only on desktop */}
                        <div className="d-none d-lg-block mt-4 pt-4 border-top">
                          <h6 className="fw-bold text-success mb-3">Quick Info</h6>
                          <div className="text-start">
                            <p className="mb-2">
                              <i className="bi bi-person me-2 text-success"></i>
                              <small className="text-muted">{profile?.full_name || "Name not set"}</small>
                            </p>
                            <p className="mb-2">
                              <i className="bi bi-envelope me-2 text-success"></i>
                              <small className="text-muted">{profile?.email || user?.email}</small>
                            </p>
                            <p className="mb-2">
                              <i className="bi bi-globe me-2 text-success"></i>
                              <small className="text-muted">
                                {countries.find(c => c.code === profile?.country)?.name || "Country not set"}
                              </small>
                            </p>
                            <p className="mb-0">
                              <i className="bi bi-credit-card me-2 text-success"></i>
                              <span className={`badge ${profile?.payment_method === 'premium' ? 'bg-success' : 'bg-secondary'} badge-sm`}>
                                {profile?.payment_method || 'Basic'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Form - Right side on desktop */}
                    <div className="col-12 col-lg-8">
                      <div className="ps-lg-4">
                        {/* Profile Form */}
                        <form onSubmit={handleSaveProfile}>
                          <div className="row g-3">
                            {/* Full Name */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-person me-2"></i>Full Name
                              </label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {profile?.full_name || "Not provided"}
                                </p>
                              ) : (
                                <input
                                  type="text"
                                  name="full_name"
                                  className="form-control"
                                  value={formData.full_name}
                                  onChange={handleInputChange}
                                  required
                                />
                              )}
                            </div>

                            {/* Email */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-envelope me-2"></i>Email Address
                              </label>
                              <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                {profile?.email || user?.email || "Not provided"}
                                <small className="text-muted d-block">Email cannot be changed</small>
                              </p>
                            </div>

                            {/* Phone Number */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-telephone me-2"></i>Phone Number
                              </label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {profile?.phone_number || "Not provided"}
                                </p>
                              ) : (
                                <input
                                  type="tel"
                                  name="phone_number"
                                  className="form-control"
                                  value={formData.phone_number}
                                  onChange={handleInputChange}
                                  placeholder="+1 (555) 123-4567"
                                />
                              )}
                            </div>

                            {/* Country */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-globe me-2"></i>Country
                              </label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {countries.find(c => c.code === profile?.country)?.name || profile?.country || "Not provided"}
                                </p>
                              ) : (
                                <select
                                  name="country"
                                  className="form-select"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select Country</option>
                                  {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                      {country.name}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>

                            {/* Home Address */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-geo-alt me-2"></i>Home Address
                              </label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {profile?.home_address || "Not provided"}
                                </p>
                              ) : (
                                <textarea
                                  name="home_address"
                                  className="form-control"
                                  value={formData.home_address}
                                  onChange={handleInputChange}
                                  rows="2"
                                  placeholder="Enter your full address"
                                />
                              )}
                            </div>

                            {/* Bank Information */}
                            <div className="col-12">
                              <h6 className="fw-bold mt-3 mb-3 pb-2 border-bottom">
                                <i className="bi bi-bank me-2"></i>Banking Information
                              </h6>
                            </div>

                            {/* Account Number */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Account Number</label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {profile?.account_number || "Not provided"}
                                </p>
                              ) : (
                                <input
                                  type="text"
                                  name="account_number"
                                  className="form-control"
                                  value={formData.account_number}
                                  onChange={handleInputChange}
                                  placeholder="1234567890"
                                />
                              )}
                            </div>

                            {/* Bank Name */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Bank Name</label>
                              {!isEditing ? (
                                <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                  {profile?.bank_name || "Not provided"}
                                </p>
                              ) : (
                                <input
                                  type="text"
                                  name="bank_name"
                                  className="form-control"
                                  value={formData.bank_name}
                                  onChange={handleInputChange}
                                  placeholder="Enter bank name"
                                />
                              )}
                            </div>

                            {/* Referral Link */}
                            <div className="col-12">
                              <h6 className="fw-bold mt-3 mb-3 pb-2 border-bottom">
                                <i className="bi bi-share me-2"></i>Referral Information
                              </h6>
                              <label className="form-label fw-semibold">Your Referral Link</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={`${window.location.origin}/register?ref=${user?.id}`}
                                  readOnly
                                />
                                <button 
                                  className="btn btn-success" 
                                  type="button"
                                  onClick={copyReferralLink}
                                >
                                  <i className="bi bi-copy me-2"></i>
                                  <span className="d-none d-sm-inline">Copy</span>
                                </button>
                              </div>
                              <small className="text-muted">Share this link to earn referral commissions</small>
                            </div>

                            {/* Payment Method */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">
                                <i className="bi bi-credit-card me-2"></i>Payment Method
                              </label>
                              <p className="form-control-plaintext border rounded px-3 py-2 bg-light">
                                <span className={`badge ${profile?.payment_method === 'premium' ? 'bg-success' : 'bg-secondary'}`}>
                                  {profile?.payment_method || 'Not set'}
                                </span>
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-space mt-4">
            <Smallfooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
