import image from '../image/image.svg'
import { useState,useEffect } from 'react';
import './login.css'
function Login(){
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return(
        <div className="login-container">
            <div className='login-form'>
                
                <div className='signup-form-header'>
                    <h1>CONNEXION</h1>
                </div>
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
                        <div className='motdepasse'>
                        <input className='inputmotdepasse' type="password" placeholder="Mot de passe" />
                        </div>
                        <div className='valider'>
                            <button>
                                CONNEXION
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )

}
export default Login