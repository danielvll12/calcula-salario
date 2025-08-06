import React, { useState } from "react";

function Salario() {
  const [diasTrabajados, setDiasTrabajados] = useState("");
  const [horasExtras, setHorasExtras] = useState("");
  const [horasNocturnas, setHorasNocturnas] = useState("");
  const [resultado, setResultado] = useState(null);
  const [mensajeHorasExtras, setMensajeHorasExtras] = useState("");

  const calcularSalario = () => {
    const salarioMensual = 408;
    const salarioDiario = salarioMensual / 30;
    const salarioQuincenalBase = salarioMensual / 2;
    const salarioPorDia = salarioQuincenalBase / 15;
    const salarioPorHoraExtra = (salarioDiario / 8) * 2; // 200%
    const salarioPorHoraNocturna = (salarioDiario / 8) * 2.5; // 250%

    const dias = parseFloat(diasTrabajados);
    const extras = parseFloat(horasExtras);
    const nocturnas = parseFloat(horasNocturnas);

    if (isNaN(dias) || isNaN(extras) || isNaN(nocturnas)) {
      alert("Por favor, ingresa valores válidos.");
      return;
    }

    const salarioPorDias = dias * salarioPorDia;
    const salarioPorExtras = extras * salarioPorHoraExtra;
    const salarioPorNocturnas = nocturnas * salarioPorHoraNocturna;
    const totalDevengado = salarioPorDias + salarioPorExtras + salarioPorNocturnas;

    // Descuentos (solo sobre lo ganado)
    const baseISSS = Math.min(totalDevengado, 1000);
    const descuentoISSS = baseISSS * 0.03;
    const descuentoAFP = totalDevengado * 0.0725;

    // Cálculo renta (ISR)
    const baseRenta = totalDevengado - descuentoISSS - descuentoAFP;
    let descuentoRenta = 0;

    if (baseRenta > 236 && baseRenta <= 447.62) {
      descuentoRenta = (baseRenta - 236) * 0.1 + 8.83;
    } else if (baseRenta <= 1019.05 && baseRenta > 447.62) {
      descuentoRenta = (baseRenta - 447.62) * 0.2 + 30;
    } else if (baseRenta > 1019.05) {
      descuentoRenta = (baseRenta - 1019.05) * 0.3 + 144.29;
    }

    const totalDescuentos = descuentoISSS + descuentoAFP + descuentoRenta;
    const salarioNeto = totalDevengado - totalDescuentos;

    // Mostrar advertencia si no hubo horas extras
    if (extras === 0 && nocturnas === 0) {
      setMensajeHorasExtras("⚠️ No se registraron horas extras, el salario será menor al promedio.");
    } else {
      setMensajeHorasExtras("");
    }

    setResultado({
      salarioPorDias: salarioPorDias.toFixed(2),
      salarioPorExtras: salarioPorExtras.toFixed(2),
      salarioPorNocturnas: salarioPorNocturnas.toFixed(2),
      totalDevengado: totalDevengado.toFixed(2),
      descuentoISSS: descuentoISSS.toFixed(2),
      descuentoAFP: descuentoAFP.toFixed(2),
      descuentoRenta: descuentoRenta.toFixed(2),
      salarioNeto: salarioNeto.toFixed(2),
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Calcula Tu Salario Quincenal</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Días trabajados (quincena): </label>
        <input
          type="number"
          value={diasTrabajados}
          onChange={(e) => setDiasTrabajados(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Horas extras diurnas: </label>
        <input
          type="number"
          value={horasExtras}
          onChange={(e) => setHorasExtras(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Horas extras nocturnas: </label>
        <input
          type="number"
          value={horasNocturnas}
          onChange={(e) => setHorasNocturnas(e.target.value)}
        />
      </div>

      <button onClick={calcularSalario}>Calcular</button>

      {mensajeHorasExtras && (
        <p style={{ color: "orange", marginTop: "10px" }}>{mensajeHorasExtras}</p>
      )}

      {resultado && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado:</h3>
          <p>Salario por días trabajados: ${resultado.salarioPorDias}</p>
          <p>Salario por horas extras diurnas: ${resultado.salarioPorExtras}</p>
          <p>Salario por horas extras nocturnas: ${resultado.salarioPorNocturnas}</p>
          <p>Total devengado sin descuento: ${resultado.totalDevengado}</p>
          <p>Descuento ISSS: ${resultado.descuentoISSS}</p>
          <p>Descuento AFP: ${resultado.descuentoAFP}</p>
          <p>Descuento Renta (ISR): ${resultado.descuentoRenta}</p>
          <hr />
          <h4>Salario Neto a recibir: ${resultado.salarioNeto}</h4>
       <p className="aviso-parpadeo">
  ⚠️ No dejes que te estafen
</p>


        </div>
      )}
    </div>
  );
}

export default Salario;
