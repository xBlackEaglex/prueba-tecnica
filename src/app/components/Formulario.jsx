"use client"

import React, { useState } from 'react';
import { useContextoEmpleados } from '../context/ContextoEmpleados';
import styles from '../Formulario.module.css';

const Formulario = () => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const numeroAlAzar = getRandomInt(1, 10000);
  let id = numeroAlAzar;

  const { agregarEmpleado } = useContextoEmpleados();
  const initialFormData = {
    id: id,
    fullName: '',
    birthDate: '',
    age: '',
    position: '',
    status: 'activo',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Catálogo de cargos
  const positionCatalog = [
    {
      id: 1,
      descripsion: "Gerente"
    },
    {
      id: 2,
      descripsion: "Coordinador"
    },
    {
      id: 3,
      descripsion: "Subdirector"
    }
  ]

  const handleChange = (e) => {
    id++;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar mensaje de error al cambiar un campo
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Mostrar mensajes de error si existen
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Agregar el nuevo empleado al estado global
      agregarEmpleado(formData);
      // Restablecer el formulario si es necesario
      setFormData(initialFormData);
    }
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Nombre completo:
          <input
            className={styles.formInput}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </label>
        <br />

        <label className={styles.formLabel}>
          Fecha de nacimiento:
          <input
            className={styles.formInput}
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <span>{errors.birthDate}</span>}
        </label>
        <br />

        <label className={styles.formLabel}>
          Edad:
          <input
            className={styles.formInput}
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span>{errors.age}</span>}
        </label>
        <br />

        <label className={styles.formLabel}>
          Cargo:
          <select
            className={styles.formSelect}
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Selecciona un cargo</option>
            {positionCatalog.map((position) => (
              <option key={position.id} value={position.id}>
                {position.descripsion}
              </option>
            ))}
          </select>
          {errors.position && <span>{errors.position}</span>}
        </label>
        <br />

        <label className={styles.formLabel}>
          Estatus:
          <select
            className={styles.formSelect}
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          {errors.status && <span>{errors.status}</span>}
        </label>
        <br />

        <button className={styles.formButton} type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Formulario;