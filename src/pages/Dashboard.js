import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [certs, setCerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (!user) navigate('/login');
    else {
      setUser(user);
      fetchCertificates(user.id);
    }
  });
}, [navigate]);  // ✅ Fixes ESLint warning


  const fetchCertificates = async (userId) => {
    const { data } = await supabase.storage.from('certificates').list(userId + '/', {
      limit: 100,
    });
    setCerts(data || []);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('certificates').upload(filePath, file);

    if (!error) {
      alert("Uploaded!");
      fetchCertificates(user.id);
    } else alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2>Welcome to CredHex</h2>
      <button onClick={handleLogout}>Logout</button>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      <div className="certificates">
        <h3>Your Certificates</h3>
        <ul>
          {certs.map((cert, index) => (
            <li key={index}>
              <a href={`https://biogorgidbdgfhqgkbxp.supabase.co/storage/v1/object/public/certificates/${user.id}/${cert.name}`} target="_blank" rel="noopener noreferrer">
                {cert.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}
