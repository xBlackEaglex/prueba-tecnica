// components/Tabla.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { usarContextoEmpleados } from '../context/ContextoEmpleados';
import styles from '../Tabla.module.css';


const Tabla = () => {
  const { empleados } = usarContextoEmpleados();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredEmployees, setFilteredEmployees] = useState(empleados || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

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

  const handleEditAge = (employeeId, newAge) => {
    // Implementa la lógica para actualizar la edad del empleado
    console.log(`Actualizar edad del empleado ${employeeId} a ${newAge}`);
    setForceUpdate(!forceUpdate);
  };

  const handleToggleStatus = (employeeId, currentStatus) => {
    // Implementa la lógica para cambiar el estatus del empleado
    console.log(`Cambiar estatus del empleado ${employeeId} a ${!currentStatus}`);
    setForceUpdate(!forceUpdate);
  };

  const handleDeleteEmployee = (employeeId) => {
    // Implementa la lógica para eliminar al empleado
    console.log(`Eliminar empleado ${employeeId}`);
    setForceUpdate(!forceUpdate);
  };

  const filterEmployees = () => {
    // Filtra empleados según el término de búsqueda
    const filtered = empleados
      ? empleados.filter((employee) => {
          const fullName = (employee.fullName || '').toLowerCase(); // Verificación para 'nombre'
          const searchTermLower = (searchTerm || '').toLowerCase(); // Verificación para 'searchTerm'
          return fullName.includes(searchTermLower);
        })
      : [];

    setFilteredEmployees(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reinicia a la primera página al realizar una búsqueda
    filterEmployees();
  };

  useEffect(() => {
    filterEmployees();
    console.log("Empleados:", empleados);
  }, [searchTerm, empleados]);

  useEffect(() => {
    // Actualiza la tabla cuando cambia el estado global de empleados
    setFilteredEmployees(empleados || []);
  }, [empleados, forceUpdate]);

  const startIndex = currentPage * pageSize;
  const visibleEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);

  console.log("Empleados visibles:", visibleEmployees);

  return (
    <div className={styles.tabla}>
      <h2>Listado de Empleados</h2>
      <div>
        <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        <button onClick={handleSearch}>Buscar</button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Edad</th>
            <th>Editar Edad</th>
            <th>Cambiar Estatus</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {visibleEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{positionCatalog.find((position) => position.id == employee.position)?.descripsion}</td>
              <td>{employee.age}</td>
              <td>
                <input
                  type="number"
                  value={employee.age}
                  onChange={(e) => handleEditAge(employee.id, e.target.value)}
                />
              </td>
              <td>
                {employee.status === "activo" && (
                  <button onClick={() => handleToggleStatus(employee.id, employee.status)}>
                    Desactivar
                  </button>
                )}
                {employee.status === "inactivo" && (
                  <button onClick={() => handleToggleStatus(employee.id, employee.status)}>
                    Activar
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
          Página anterior
        </button>
        <span>Página {currentPage + 1}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (startIndex + pageSize < filteredEmployees.length ? prev + 1 : prev))
          }
        >
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default Tabla;