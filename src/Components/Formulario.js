import React, { useState } from 'react';

const Formulario = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    avatar: 'https://picsum.photos/800'
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
    
            const responseData = await response.json();
            const userId = responseData.id;
            const role = responseData.role;
    
          
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: ''
            });
    
            
            alert(`Cliente registrado con éxito. El número de cliente es ${userId}, y su rol es ${role}`);
        } catch (error) {
            alert('Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.');
            console.error(error);
        }
    };

    return (
        <div className="formulario-fondo d-flex justify-content-center align-items-center min-vh-100 bg-dark">
            <form className="advanced-form p-4 rounded bg-secondary text-white w-50" onSubmit={handleSubmit}>
            <h1 className="text-center text-white mb-4">Registrar Usuario</h1>
                <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Ingrese su nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Ingrese su correo"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Confirma tu Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirme su contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Ingrese su dirección"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">Enviar</button>
            </form>
        </div>
    );
};

export default Formulario;