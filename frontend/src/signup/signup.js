import React, { useState } from 'react';
import './signup.css';

import image from '../image/image.svg'

const Signup = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNextStep, setShowNextStep] = useState(false); 

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleNextStep = () => {
        // Mettre à jour l'état pour afficher le prochain formulaire/section
        setShowNextStep(true);
    };
    const [civilStatus, setCivilStatus] = useState('single'); // État civil par défaut

    const handleCivilStatusChange = (e) => {
        setCivilStatus(e.target.value);
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <div className='signup-form-header'>
                    <h1>INSCRIPTION</h1>
                </div>
                {!showNextStep && ( 
                    <div className='formsignupbody'>
                        <div className='signup-text'>
                            <h2>Téléchargez une photo de pièce d’identité valide. Assurez-vous que tous les détails sont clairs.</h2>
                        </div>
                        <div className='signup-image'>
                            <div className="image-upload">
                                <label htmlFor="file-input">
                                    <img src={selectedImage || image} alt="Profile" className="profile-image"/>
                                    <h3>Glisser une pièce d’identité ou importer</h3>
                                </label>
                                <input id="file-input" type="file" onChange={handleImageChange} />
                            </div>
                        </div>
                        <div className='buttonsignup'>
                            <button className='suivantsignup' onClick={handleNextStep}>
                                suivant
                            </button>
                        </div>
                    </div>
                )}

                {showNextStep && ( 
                    <div className='formsignupbody'>
                        <div className='inputContact'>
                            <div className="input-container">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="example@gmail.com" />
                            </div>

                            <div className="input-container">
                                <label htmlFor="contact">Contact</label>
                                <input type="text" id="contact" name="contact" placeholder="+261 xx xx xxx xx" />
                            </div>
                        </div>
                        <div className='etatCivil'>
                            <h1>Etat civil</h1>
                            
                            <div className='radio-container'>
                            
                                <input
                                    type="radio"
                                    id="single"
                                    name="civilStatus"
                                    value="single"
                                    checked={civilStatus === 'single'}
                                    onChange={handleCivilStatusChange}
                                />
                                <label htmlFor="single">Célibataire</label>

                                <input
                                    type="radio"
                                    id="married"
                                    name="civilStatus"
                                    value="married"
                                    checked={civilStatus === 'married'}
                                    onChange={handleCivilStatusChange}
                                />
                                <label htmlFor="married">Marié(e)</label>

                                <input
                                    type="radio"
                                    id="divorced"
                                    name="civilStatus"
                                    value="divorced"
                                    checked={civilStatus === 'divorced'}
                                    onChange={handleCivilStatusChange}
                                />
                                <label htmlFor="divorced">Divorcé(e)</label>

                                <input
                                    type="radio"
                                    id="widowed"
                                    name="civilStatus"
                                    value="widowed"
                                    checked={civilStatus === 'widowed'}
                                    onChange={handleCivilStatusChange}
                                />
                                <label htmlFor="widowed">Veuf/Veuve</label>
                            </div>

                    </div>
                    <div className='motdepasse'>
                        <input className='inputmotdepasse' type="password" placeholder="Mot de passe" />
                    </div>

                    <div className='confirmationMotdepasse'>
                        <input className='inputconfirm' type="password" placeholder="Confirmation du mot de passe" />
                    </div>
                        <div className='valider'>
                            <button>
                                valider
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
