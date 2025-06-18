const modulos = [
  { nome: "OSDA 585W", potencia: 585, corrente: 13.76, curto: 14.55, tensao: 42.52 },
  { nome: "OSDA 610W", potencia: 610, corrente: 15.08, curto: 15.96, tensao: 40.46 },
  { nome: "DAH 620W", potencia: 620, corrente: 15.01, curto: 16.0, tensao: 39.02 },
  { nome: "ZNSHINE 620W", potencia: 620, corrente: 15.13, curto: 16.05, tensao: 41.0 },
  { nome: "RENE SOLAR 600W", potencia: 600, corrente: 13.43, curto: 14.02, tensao: 44.68 },
  { nome: "ERA SOLAR 700W", potencia: 700, corrente: 16.76, curto: 17.81, tensao: 41.78 },
  { nome: "RONMA SOLAR 570W", potencia: 570, corrente: 13.48, curto: 14.25, tensao: 42.29 },
  { nome: "SUNOVA SOLAR 610W", potencia: 610, corrente: 13.69, curto: 14.59, tensao: 44.7 }
];


const moduloSelect = document.getElementById("modulo");
const inversorSelect = document.getElementById("inversor");

modulos.forEach((modulo, index) => {
  const opt = document.createElement("option");
  opt.value = index;
  opt.textContent = `${modulo.nome} - ${modulo.corrente}A`;
  moduloSelect.appendChild(opt);
});

inversores.forEach((inv, index) => {
  const opt = document.createElement("option");
  opt.value = index;
  opt.textContent = `${inv.nome} - ${inv.corrente}A`;
  inversorSelect.appendChild(opt);
});

function verificarCompatibilidade() {
  const modulo = modulos[moduloSelect.value];
  const inversor = inversores[inversorSelect.value];

  const resultadoDiv = document.getElementById("resultado");
  const potencia_resultante = (modulo.tensao * inversor.corrente).toFixed(2);
  const ehSolplanetOuSolis = inversor.nome.includes("Solplanet") || inversor.nome.includes("Solis");
  const ehZNSHINEespecial = modulo.nome.includes("ZNSHINE 620W") && inversor.nome === "Kehua Trifásico";

  if (ehZNSHINEespecial) {
    resultadoDiv.className = "resultado azul-claro";
    resultadoDiv.innerHTML = `
      🔷 Compatível: Autorização especial<br>
      Módulo: ${modulo.nome} (${modulo.corrente}A, ${modulo.tensao}V)<br>
      Inversor: ${inversor.nome} (${inversor.corrente}A)<br><br>
      <strong>Venda autorizada por ADEMIR via email.</strong>
    `;
  } else if (modulo.corrente <= inversor.corrente) {
    resultadoDiv.className = "resultado verde";
    resultadoDiv.innerHTML = `
      ✅ Compatível!<br>
      A corrente de operação do módulo (${modulo.corrente}A) está dentro do limite do inversor (${inversor.corrente}A).
    `;
  } else if (ehSolplanetOuSolis) {
    resultadoDiv.className = "resultado amarelo";
    resultadoDiv.innerHTML = `
      ⚠️ Compatível com ressalva<br>
      A corrente do módulo (${modulo.corrente}A) excede a do inversor (${inversor.corrente}A).<br><br>
      <strong>Explicação:</strong><br>
      Segundo a Lei da Ohm: Potência(W) é igual a tensão(V) multiplicado pela corrente(I) -> com ${modulo.tensao}V × ${inversor.corrente}A → potência limitada a <strong>${potencia_resultante}W</strong>.<br>
      Parte da corrente excedente será dissipada como calor, reduzindo a eficiência do módulo.
    `;
  } else {
    resultadoDiv.className = "resultado vermelho";
    resultadoDiv.innerHTML = `
      ❌ Incompatível!<br>
      A corrente de operação do módulo (${modulo.corrente}A) é maior que a suportada pelo inversor (${inversor.corrente}A).<br><br>
      <strong>Explicação:</strong><br>
      Segundo a Lei da Ohm: Potência(W) é igual a tensão(V) multiplicado pela corrente(I) -> com ${modulo.tensao}V × ${inversor.corrente}A → potência limitada a <strong>${potencia_resultante}W</strong>.<br>
      A corrente excedente será dissipada em forma de calor, e o módulo não entregará sua potência nominal.
    `;
  }
}

