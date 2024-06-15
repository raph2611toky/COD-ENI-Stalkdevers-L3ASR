import image from "../image/image.svg";
import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
function Login() {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const [password, setPassword] = useState(null)
  const [email ,setEmail] = useState(null)
  const api = process.env.REACT_APP_API_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', image);

    try {
      const response = await fetch('https://example.com/api/upload', { // Remplacez par l'URL de votre API
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Success:', data);
     
    } catch (error) {
      console.error('Error:', error);
      
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="signup-form-header">
          <h1>CONNEXION</h1>
        </div>
        <div className="formsignupbody">
          <div className="uplodsection">
            <div className="signup-text">
              <p>
                Téléchargez une photo de pièce d’identité valide. Assurez-vous
                que tous les détails sont clairs.
              </p>
            </div>
            <div className="signup-image">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={selectedImage || image}
                    alt="Profile"
                    className="profile-image"
                  />
                </label>
                <p>
                  Glisser une pièce d’identité ou{" "}
                  <label htmlFor="file-input">importer</label>
                </p>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="motdepasse">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              className="inputmotdepasse"
              type="password"
              placeholder="Mot de passe"
            />
          </div>
          <div className="valider">
            <button onClick={handleSubmit}>Se connecter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
