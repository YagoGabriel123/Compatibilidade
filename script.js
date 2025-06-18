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

const inversores = [
  { nome: "Kehua Monofásico", marca: "Kehua", modelo: "Monofásico", corrente: 16.0, curto: 20.0 },
  { nome: "Kehua Trifásico", marca: "Kehua", modelo: "Trifásico", corrente: 15.0, curto: 18.75 },
  { nome: "Solis Monofásico", marca: "Solis", modelo: "Monofásico", corrente: 16.0, curto: 25.0 },
  { nome: "Solis Trifásico", marca: "Solis", modelo: "Trifásico", corrente: 16.0, curto: 22.0 },
  { nome: "Solplanet Monofásico", marca: "Solplanet", modelo: "Monofásico", corrente: 16.0, curto: 24.0 },
  { nome: "Solplanet Trifásico", marca: "Solplanet", modelo: "Trifásico", corrente: 16.0, curto: 24.0 }
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
  const ehSolplanetOuSolis = inversor.marca === "Solplanet" || inversor.marca === "Solis";
  const ehZNSHINEespecial = modulo.nome.includes("ZNSHINE 620W") && inversor.nome === "Kehua Trifásico";

  let mensagemDados = `
    <strong>🔌 Módulo Selecionado:</strong><br>
    Modelo: ${modulo.nome}<br>
    Potência: ${modulo.potencia}W<br>
    Corrente de operação: ${modulo.corrente}A<br>
    Corrente de curto-circuito: ${modulo.curto}A<br>
    Tensão de operação: ${modulo.tensao}V<br><br>

    <strong>⚡ Inversor Selecionado:</strong><br>
    Marca/Modelo: ${inversor.nome}<br>
    Corrente de operação: ${inversor.corrente}A<br>
    Corrente de curto-circuito: ${inversor.curto}A<br><br>
  `;

  if (ehZNSHINEespecial) {
    resultadoDiv.className = "resultado azul-claro";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      🔷 <strong>Compatível com autorização especial</strong><br>
      Venda autorizada por ADEMIR via email.
    `;
  } else if (modulo.corrente <= inversor.corrente) {
    resultadoDiv.className = "resultado verde";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ✅ <strong>Compatível:</strong> A corrente do módulo está dentro do limite do inversor.
    `;
  } else if (ehSolplanetOuSolis) {
    resultadoDiv.className = "resultado amarelo";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ⚠️ <strong>Compatível com ressalva:</strong> A corrente do módulo (${modulo.corrente}A) excede a do inversor (${inversor.corrente}A).<br><br>
      Pela Lei da Potência (P = V × I):<br>
      Potência limitada a <strong>${potencia_resultante}W</strong>.<br>
      A corrente excedente será dissipada como calor, reduzindo a eficiência do sistema.
    `;
  } else {
    resultadoDiv.className = "resultado vermelho";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ❌ <strong>Incompatível:</strong> A corrente do módulo (${modulo.corrente}A) excede a suportada pelo inversor (${inversor.corrente}A).<br><br>
      Pela Lei da Potência (P = V × I):<br>
      Potência limitada a <strong>${potencia_resultante}W</strong>.<br>
      Parte da corrente será dissipada como calor, diminuindo a entrega de potência.
    `;
  }
}
