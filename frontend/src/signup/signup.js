import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import image from '../image/image.svg'
import { useNavigation } from 'react-router-dom';

const Signup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [etatCivil, setEtatCivil] = useState(null);
  const [password, setPassword] = useState(null);
  const [motDePasse, setMotDePasse] = useState("");
  const [ConfirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [images, setImages] = useState(null);
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [id, setId] = useState(null);
  const api = process.env.REACT_APP_API_URL;
  const handleImageChange = (event) => {
    setImages(event.target.files[0]);
  };

  const handleValider = async () => {
    try {
      const response = await axios.post(`${api}api/users/register/`, {
        first_name: nom,
        last_name: prenom,
        contact: contact,
        email: email,
        status_etat_civile: civilStatus,
        password: motDePasse,
        confirm_password: ConfirmMotDePasse,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const [showNextStep, setShowNextStep] = useState(false);

  const handleNextStep = async () => {
    const formData = new FormData();

    if (images) {
      formData.append("identity", images);
    }

    try {
      const response = await axios.post(
        `${api}api/users/register/info_cin/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages(response.data.photo_identity);
      setNom(response.data.info.name);
      setPrenom(response.data.info.surname);
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
    setShowNextStep(true);
  };
  const [civilStatus, setCivilStatus] = useState("single");

  const handleCivilStatusChange = (e) => {
    setCivilStatus(e.target.value);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-form-header">
          <h1>INSCRIPTION</h1>
        </div>
        {!showNextStep && (
          <div className="formsignupbody">
            <div className="signup-text">
              <h2>
                Téléchargez une photo de pièce d’identité valide. Assurez-vous
                que tous les détails sont clairs.
              </h2>
            </div>
            <div className="signup-image">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={selectedImage || image}
                    alt="Profile"
                    className="profile-image"
                  />
                  <h3>Glisser une pièce d’identité ou importer</h3>
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="buttonsignup">
              <button className="suivantsignup" onClick={handleNextStep}>
                suivant
              </button>
            </div>
          </div>
        )}

        {showNextStep && (
          <div className="formsignupbody">
            <div className="inputContact">
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-container">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="+261 xx xx xxx xx"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div className="etatCivil">
              <h1>Etat civil</h1>

              <div className="radio-container">
                <input
                  type="radio"
                  id="single"
                  name="civilStatus"
                  value="single"
                  checked={civilStatus === "célibataire"}
                  onChange={handleCivilStatusChange}
                />
                <label htmlFor="single">Célibataire</label>

                <input
                  type="radio"
                  id="married"
                  name="civilStatus"
                  value="married"
                  checked={civilStatus === "marié"}
                  onChange={handleCivilStatusChange}
                />
                <label htmlFor="married">Marié(e)</label>

                <input
                  type="radio"
                  id="divorced"
                  name="civilStatus"
                  value="divorced"
                  checked={civilStatus === "divorcé"}
                  onChange={handleCivilStatusChange}
                />
                <label htmlFor="divorced">Divorcé(e)</label>

                <input
                  type="radio"
                  id="widowed"
                  name="civilStatus"
                  value="widowed"
                  checked={civilStatus === "veuf"}
                  onChange={handleCivilStatusChange}
                />
                <label htmlFor="widowed">Veuf/Veuve</label>
              </div>
            </div>
            <div className="motdepasse">
              <input
                className="inputmotdepasse"
                type="password"
                placeholder="Mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>

            <div className="confirmationMotdepasse">
              <input
                className="inputconfirm"
                type="password"
                placeholder="Confirmation du mot de passe"
                value={ConfirmMotDePasse}
                onChange={(e) => setConfirmMotDePasse(e.target.value)}
              />
            </div>
            <div className="valider">
              <button onClick={handleValider}>valider</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
