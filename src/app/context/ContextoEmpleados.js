// context/ContextoEmpleados.js

import { createContext, useContext, useState } from 'react';

const ContextoEmpleados = createContext();

export const ProveedorEmpleados = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  const agregarEmpleado = (nuevoEmpleado) => {
    console.log("agregar empleado", nuevoEmpleado);
    setEmpleados((empleadosAnteriores) => [...empleadosAnteriores, nuevoEmpleado]);
  };

  const actualizarEmpleado = (empleadoActualizado) => {
    setEmpleados((empleadosAnteriores) =>
      empleadosAnteriores.map((empleado) =>
        empleado.id === empleadoActualizado.id ? empleadoActualizado : empleado
      )
    );
  };

  const eliminarEmpleado = (idEmpleado) => {
    setEmpleados((empleadosAnteriores) =>
      empleadosAnteriores.filter((empleado) => empleado.id !== idEmpleado)
    );
  };

  return (
    <ContextoEmpleados.Provider value={{ empleados, agregarEmpleado, actualizarEmpleado, eliminarEmpleado }}>
      {children}
    </ContextoEmpleados.Provider>
  );
};

export const useContextoEmpleados = () => {
  return useContext(ContextoEmpleados);
};