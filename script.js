const modulos = [
  { nome: "OSDA 585W", potencia: 585, corrente: 13.76, curto: 14.55, tensao: 42.52, datasheet: "https://drive.google.com/file/d/1VF2hUhhOnouNY5BywRHNf9OvkKMK1bQg/view?usp=sharing" },
  { nome: "OSDA 610W", potencia: 610, corrente: 15.08, curto: 15.96, tensao: 40.46, datasheet: "https://drive.google.com/file/d/1pMyncKUfGFUG7figL9Iq0a6B1aYW5UMO/view?usp=sharing" },
  { nome: "DAH 620W", potencia: 620, corrente: 15.01, curto: 16.0, tensao: 39.02, datasheet: "https://drive.google.com/file/d/1FUaysCjhC_BmpGkx8OM65kmZrESfX_D4/view?usp=sharing" },
  { nome: "ZNSHINE 620W", potencia: 620, corrente: 15.13, curto: 16.05, tensao: 41.0, datasheet: "https://drive.google.com/file/d/1VGZcEZ4vPOs2MVsvFuWwZKxMyLrnFQ1d/view?usp=sharing" },
  { nome: "RENE SOLAR 600W", potencia: 600, corrente: 13.43, curto: 14.02, tensao: 44.68, datasheet: "https://drive.google.com/file/d/1Qv_OtYMNGds4qvInA_7C7JfAoG3rdfS6/view?usp=drive_link" },
  { nome: "ERA SOLAR 700W", potencia: 700, corrente: 16.76, curto: 17.81, tensao: 41.78, datasheet: "https://drive.google.com/file/d/1pt_xBWRyFeFrASufBk-lty4q3Lf1KxBE/view?usp=drive_link" },
  { nome: "RONMA SOLAR 570W", potencia: 570, corrente: 13.48, curto: 14.25, tensao: 42.29, datasheet: "https://drive.google.com/file/d/12v64Hyiy9WckeTeBindKGn6G0jDCDb7F/view?usp=sharing" },
  { nome: "SUNOVA SOLAR 610W", potencia: 610, corrente: 13.69, curto: 14.59, tensao: 44.7, datasheet: "#" },
  { nome: "ASTRONERGY 575W", potencia: 575, corrente: 13.39, curto: 14.19, tensao: 42.94, datasheet: "https://drive.google.com/file/d/1rfIxscB1L_DFvUW927yZbjSBAsl75uoj/view?usp=drive_link" }
];
const inversores = [
  { nome: "Kehua Monofásico", marca: "Kehua", modelo: "Monofásico", corrente: 16.0, curto: 20.0, datasheet: "https://drive.google.com/file/d/1yz3WI8IQdK6_pSeOd47iBvgh2PsE3OVT/view?usp=sharing" },
  { nome: "Kehua Trifásico", marca: "Kehua", modelo: "Trifásico", corrente: 15.0, curto: 18.75, datasheet: "https://drive.google.com/file/d/1yz3WI8IQdK6_pSeOd47iBvgh2PsE3OVT/view?usp=sharing" },
  { nome: "Solis Monofásico", marca: "Solis", modelo: "Monofásico", corrente: 16.0, curto: 25.0, datasheet: "https://drive.google.com/drive/folders/19fUOeU9WHKUTLFxN-AI_QsSneI_7DWw3" },
  { nome: "Solis Trifásico", marca: "Solis", modelo: "Trifásico", corrente: 16.0, curto: 22.0, datasheet: "https://drive.google.com/drive/folders/1ai9B871bdRYkENDzoQZoMKq2gUCVzH_x" },
  { nome: "Solplanet Monofásico", marca: "Solplanet", modelo: "Monofásico", corrente: 16.0, curto: 24.0, datasheet: "https://drive.google.com/file/d/1yam2DEymQ06NKg9esLfxJFvckgZDS71Y/view?usp=drive_link" },
  { nome: "Solplanet Trifásico", marca: "Solplanet", modelo: "Trifásico", corrente: 16.0, curto: 24.0, datasheet: "https://drive.google.com/file/d/1yam2DEymQ06NKg9esLfxJFvckgZDS71Y/view?usp=drive_link" }
];

const moduloSelect = document.getElementById("modulo");
const inversorSelect = document.getElementById("inversor");

modulos.forEach((modulo, index) => {
  const opt = document.createElement("option");
  opt.value = index;
  opt.textContent = modulo.nome;
  moduloSelect.appendChild(opt);
});

inversores.forEach((inv, index) => {
  const opt = document.createElement("option");
  opt.value = index;
  opt.textContent = inv.nome;
  inversorSelect.appendChild(opt);
});

function verificarCompatibilidade() {
  const modulo = modulos[moduloSelect.value];
  const inversor = inversores[inversorSelect.value];
  const resultadoDiv = document.getElementById("resultado");

  const ehSolplanetOuSolis = inversor.marca === "Solplanet" || inversor.marca === "Solis";
  const ehZNSHINEespecial = modulo.nome.includes("ZNSHINE 620W") && inversor.nome === "Kehua Trifásico";

  const correnteParaPotencia = modulo.corrente > inversor.corrente ? inversor.corrente : modulo.corrente;
  const potencia_resultante = (modulo.tensao * correnteParaPotencia).toFixed(2);
  const formula = `Potência = ${modulo.tensao}V × ${correnteParaPotencia}A = ${potencia_resultante}W`;

  const links = `<br><a href="${modulo.datasheet}" target="_blank">🔗 Datasheet do Módulo</a><br><a href="${inversor.datasheet}" target="_blank">🔗 Datasheet do Inversor</a>`;

  const dados = `
    <strong>🔌 Módulo:</strong><br>${modulo.nome}<br>
    Potência: ${modulo.potencia}W<br>
    Corrente de operação: ${modulo.corrente}A<br>
    Corrente de curto: ${modulo.curto}A<br>
    Tensão: ${modulo.tensao}V<br><br>
    <strong>⚡ Inversor:</strong><br>${inversor.nome}<br>
    Corrente de operação: ${inversor.corrente}A<br>
    Corrente de curto: ${inversor.curto}A<br><br>
  `;

  if (ehZNSHINEespecial) {
    resultadoDiv.className = "resultado azul-claro";
    resultadoDiv.innerHTML = `${dados}🔷 Compatível com autorização especial. Venda autorizada por ADEMIR via email.${links}`;
  } else if (modulo.corrente <= inversor.corrente) {
    resultadoDiv.className = "resultado verde";
    resultadoDiv.innerHTML = `${dados}✅ Compatível.<br>Segundo a Lei de Ohm: Potência (W) = Tensão (V) × Corrente (A)<br>${formula}${links}`;
  } else if (ehSolplanetOuSolis) {
    resultadoDiv.className = "resultado amarelo";
    resultadoDiv.innerHTML = `${dados}⚠️ Compatível com ressalva.<br>${formula}<br>Parte da corrente será dissipada como calor.${links}`;
  } else {
    resultadoDiv.className = "resultado vermelho";
    resultadoDiv.innerHTML = `${dados}❌ Incompatível.<br>${formula}<br>Corrente excedente será dissipada em forma de calor.${links}`;
  }
}
