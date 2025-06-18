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

  const explicacaoPotencia = `
    <strong>Segundo a Lei da Ohm:</strong> Potência (W) é igual à tensão (V) multiplicada pela corrente (A).<br>
    <strong>Cálculo:</strong> Potência = ${modulo.tensao}V × ${inversor.corrente}A = <strong>${potencia_resultante}W</strong><br><br>
  `;

  if (ehZNSHINEespecial) {
    resultadoDiv.className = "resultado azul-claro";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      🔷 <strong>Compatível com autorização especial</strong><br>
      Venda autorizada por ADEMIR via email.<br><br>
      ${explicacaoPotencia}
    `;
  } else if (modulo.corrente <= inversor.corrente) {
    resultadoDiv.className = "resultado verde";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ✅ <strong>Compatível:</strong> A corrente do módulo está dentro do limite do inversor.<br><br>
      ${explicacaoPotencia}
    `;
  } else if (ehSolplanetOuSolis) {
    resultadoDiv.className = "resultado amarelo";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ⚠️ <strong>Compatível com ressalva:</strong> A corrente do módulo (${modulo.corrente}A) excede a do inversor (${inversor.corrente}A).<br><br>
      ${explicacaoPotencia}
      A corrente excedente será dissipada como calor, reduzindo a eficiência do sistema.
    `;
  } else {
    resultadoDiv.className = "resultado vermelho";
    resultadoDiv.innerHTML = `
      ${mensagemDados}
      ❌ <strong>Incompatível:</strong> A corrente do módulo (${modulo.corrente}A) excede a suportada pelo inversor (${inversor.corrente}A).<br><br>
      ${explicacaoPotencia}
      Parte da corrente será dissipada como calor, diminuindo a entrega de potência.
    `;
  }
}
