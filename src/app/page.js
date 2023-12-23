import styles from './page.module.css'
import React from 'react';
import Formulario from './components/Formulario';
import Tabla from './components/Tabla';
import { ProveedorEmpleados } from './context/ContextoEmpleados';

export default function Home() {
  return (
    <ProveedorEmpleados>
      <main className={styles.main}>
        <div className={styles.description}>
          <Formulario />
        </div>
        <div className={styles.tabla}>
          <Tabla />
        </div>
      </main>
    </ProveedorEmpleados>
  )
}
