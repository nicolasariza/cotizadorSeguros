import React from "react";
import styled from "@emotion/styled";
import { primerMayus } from "../helper";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;
const Resumen = ({ datos }) => {
  const { plan } = datos;
  if (datos.marca === "" || datos.year === "" || plan === "") return null;
  return (
    <ContenedorResumen>
      <h2>Resumen de cotización</h2>
      <ul>
        <li>Marca: {primerMayus(datos.marca)} </li>
        <li>Plan: {primerMayus(plan)}</li>
        <li>Año del plan: {primerMayus(datos.year)}</li>
      </ul>
    </ContenedorResumen>
  );
};

export default Resumen;
