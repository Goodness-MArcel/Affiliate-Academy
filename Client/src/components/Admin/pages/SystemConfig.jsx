import React, { useState, useEffect } from 'react';
import AdminSidebar from '../adminLayout/AdminSidebar';
import Smallfooter from '../../Users/UserLayout/smallfooter';
import { supabase } from '../../../../supabase';

const SystemConfig = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    // Referral Settings
    default_referral_commission: '',
    referral_commission_type: 'percentage',
    
    // Payment Settings
    paystack_public_key: '',
    paystack_secret_key: '',
    
    // Email Settings
    smtp_host: '',
    smtp_port: '',
    smtp_username: '',
    smtp_password: ''
  });

  // Live Alert Function
  const showLiveAlert = (message, type = 'success') => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (!alertPlaceholder) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    alertPlaceholder.append(wrapper);

    setTimeout(() => {
      wrapper.remove();
    }, 5000);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchSettings();
    
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.admin-sidebar');
      if (sidebar) {
        setIsSidebarCollapsed(sidebar.classList.contains('collapsed'));
      }
    };

    checkSidebarState();

    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
      
      return () => observer.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings({
          default_referral_commission: data.default_referral_commission?.toString() || '',
          referral_commission_type: data.referral_commission_type || 'percentage',
          paystack_public_key: data.paystack_public_key || '',
          paystack_secret_key: data.paystack_secret_key || '',
          smtp_host: data.smtp_host || '',
          smtp_port: data.smtp_port?.toString() || '',
          smtp_username: data.smtp_username || '',
          smtp_password: data.smtp_password || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showLiveAlert('Failed to load settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const settingsData = {
        default_referral_commission: parseFloat(settings.default_referral_commission) || 0,
        referral_commission_type: settings.referral_commission_type,
        paystack_public_key: settings.paystack_public_key,
        paystack_secret_key: settings.paystack_secret_key,
        smtp_host: settings.smtp_host,
        smtp_port: parseInt(settings.smtp_port) || 587,
        smtp_username: settings.smtp_username,
        smtp_password: settings.smtp_password,
        updated_at: new Date().toISOString()
      };

      // Check if settings exist
      const { data: existingSettings } = await supabase
        .from('system_settings')
        .select('id')
        .single();

      let error;
      if (existingSettings) {
        // Update existing settings
        const result = await supabase
          .from('system_settings')
          .update(settingsData)
          .eq('id', existingSettings.id);
        error = result.error;
      } else {
        // Insert new settings
        const result = await supabase
          .from('system_settings')
          .insert([settingsData]);
        error = result.error;
      }

      if (error) throw error;

      showLiveAlert('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showLiveAlert('Failed to save settings: ' + error.message, 'danger');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-layout d-flex">
        <AdminSidebar />
        
        <div 
          id="liveAlertPlaceholder" 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            minWidth: '300px'
          }}
        ></div>
        
        <div 
          className="main-content flex-grow-1 p-3 p-md-4"
          style={{
            marginLeft: windowWidth <= 768 ? '0' : (isSidebarCollapsed ? '80px' : '250px'),
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            overflowX: 'hidden'
          }}
        >
          <div className="mb-4">
            <h2 className="mb-2 fw-bold">
              <i className="bi bi-gear me-2 text-primary"></i>
              System Configuration
            </h2>
            <p className="text-muted mb-0">Manage system settings and configurations</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading settings...</p>
            </div>
          ) : (
            <form onSubmit={handleSaveSettings}>
              {/* Referral Settings Section */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <div className="card-body">
                  <h5 className="fw-bold text-dark mb-4">
                    <i className="bi bi-diagram-3 me-2 text-primary"></i>
                    Referral Commission Configuration
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label fw-bold text-dark">
                        Default Referral Commission <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="default_referral_commission"
                        value={settings.default_referral_commission}
                        onChange={handleInputChange}
                        placeholder="e.g., 10"
                        step="0.01"
                        required
                      />
                      <small className="text-muted">
                        Commission earned when user registers through referral link
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Settings Section */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <div className="card-body">
                  <h5 className="fw-bold text-dark mb-3">
                    <i className="bi bi-credit-card-2-front me-2 text-primary"></i>
                    Paystack Integration
                  </h5>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Get your Paystack API keys from your 
                    <a href="https://dashboard.paystack.com/#/settings/developers" target="_blank" rel="noopener noreferrer" className="ms-1">
                      Paystack Dashboard
                    </a>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        Paystack Public Key <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="paystack_public_key"
                        value={settings.paystack_public_key}
                        onChange={handleInputChange}
                        placeholder="pk_test_xxxxxxxxxxxxxxxx or pk_live_xxxxxxxxxxxxxxxx"
                      />
                      <small className="text-muted">
                        Your Paystack public key (starts with pk_)
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        Paystack Secret Key <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="paystack_secret_key"
                        value={settings.paystack_secret_key}
                        onChange={handleInputChange}
                        placeholder="sk_test_xxxxxxxxxxxxxxxx or sk_live_xxxxxxxxxxxxxxxx"
                      />
                      <small className="text-muted">
                        Your Paystack secret key (starts with sk_) - Keep this secure!
                      </small>
                    </div>

                    <div className="col-12">
                      <div className="alert alert-warning mb-0">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <strong>Security Notice:</strong> Never share your secret key publicly. 
                        Always use environment variables in production.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Settings Section */}
              <div className="card shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <div className="card-body">
                  <h5 className="fw-bold text-dark mb-3">
                    <i className="bi bi-envelope-open me-2 text-primary"></i>
                    SMTP Email Configuration
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="smtp_host"
                        value={settings.smtp_host}
                        onChange={handleInputChange}
                        placeholder="e.g., smtp.gmail.com"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="smtp_port"
                        value={settings.smtp_port}
                        onChange={handleInputChange}
                        placeholder="e.g., 587"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="smtp_username"
                        value={settings.smtp_username}
                        onChange={handleInputChange}
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="smtp_password"
                        value={settings.smtp_password}
                        onChange={handleInputChange}
                        placeholder="Your SMTP password"
                      />
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="text-end mb-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-5"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      Save All Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <Smallfooter />
        </div>
      </div>
    </>
  );
}

export default SystemConfig;
