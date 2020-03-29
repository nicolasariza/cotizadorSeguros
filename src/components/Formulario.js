import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from "../helper";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.1s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6ea;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setCargandoSpinner }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: ""
  });

  const [error, setError] = useState(false);

  // extraer los valores del state
  const { marca, year, plan } = datos;

  const agregarDatos = e => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cotizarSeguro = e => {
    e.preventDefault();

    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    //valor inicial del seguro
    let resultado = 2000;

    //se obtiene la diferencia de años con un helper

    const diferenciaYear = obtenerDiferenciaYear(parseInt(year));
    // por cada año de diferencia se resta el 3% al valor inicial
    resultado -= (diferenciaYear * 3 * resultado) / 100;
    // dependiendo de la marca aumenta el precio del seguro
    resultado = calcularMarca(marca) * resultado;
    // dependiendo del plan escogido aumenta el valor
    resultado = parseFloat(calcularPlan(plan) * resultado).toFixed(2);

    setCargandoSpinner(true);
    setTimeout(() => {
      setCargandoSpinner(false);
      setResumen({
        cotizacion: resultado,
        datos
      });
    }, 3000);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select
          name="marca"
          value={marca}
          //se pueden asignar el state de esta manera
          onChange={e =>
            setDatos({ ...datos, [e.target.name]: e.target.value })
          }
        >
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={agregarDatos}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={agregarDatos}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={agregarDatos}
        />
        Completo
      </Campo>
      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

export default Formulario;
