const { readFileSync } = require('fs');

// let pecas, faturas;

// try {
//   const { readFileSync } = require('fs');
//   const { get } = require('http');

//   pecas = JSON.parse(readFileSync('./pecas.json'));
//   faturas = JSON.parse(readFileSync('./faturas.json'));

// } catch (error) {
// }

// fetch('./pecas.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Erro ao carregar o arquivo pecas.json');
//     }
//     return response.json();
//   })
//   .then(pecasData => {
//     pecas = pecasData;
//     fetch('./faturas.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Erro ao carregar o arquivo faturas.json');
//         }
//         return response.json();
//       })
//       .then(faturas => {
//         const faturaBody = document.getElementById("fatura");
//         const faturaHTML = gerarFaturaHTML(faturas, pecas);
//         faturaBody.innerHTML = faturaHTML;
//       })
//       .catch(error => {
//         console.error('Erro ao carregar faturas.json:', error);
//       });
//   })
//   .catch(error => {
//     console.error('Erro ao carregar pecas.json:', error);
//   });

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json'));
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }
}

class ServicoCalculoFatura {

  constructor(repo) {
    this.repo = repo;
  }


  formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR",
      {
        style: "currency", currency: "BRL",
        minimumFractionDigits: 2
      }).format(valor / 100);
  }

  calcularTotalApresentacao(apre) {
    let total = 0;

    if (this.repo.getPeca(apre).tipo === "comedia") {
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
    } else if (this.repo.getPeca(apre).tipo === "tragedia") {
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
    } else {
      throw new Error(`Peça desconhecia: ${this.getPeca(apre).tipo}`);
    }


    // switch (this.getPeca(apre).tipo) {
    //   case "tragedia":
    //     total = 40000;
    //     if (apre.audiencia > 30) {
    //       total += 1000 * (apre.audiencia - 30);
    //     }
    //     break;
    //   case "comedia":
    //     total = 30000;
    //     if (apre.audiencia > 20) {
    //       total += 10000 + 500 * (apre.audiencia - 20);
    //     }
    //     total += 300 * apre.audiencia;
    //     break;
    //   default:
    //     throw new Error(`Peça desconhecia: ${this.getPeca(apre).tipo}`);
    // }

    return total;
  }

  getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(apresentacoes) {
    let creditos = 0;
    for (let apre of apresentacoes) {
      creditos += this.calcularCredito(apre);
    }
    return creditos;
  }

  calcularTotalFatura(apresentacoes) {
    let total = 0, totalfatura = 0;
    for (let apre of apresentacoes) {
      total = this.calcularTotalApresentacao(apre);
      totalfatura += total;
    }
    return totalfatura / 100;
  }
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${calc.formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${calc.formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;

  return faturaStr;
}

// function gerarFaturaHTML(fatura, pecas) {
//   let faturaHTML = '';

//   const p = `<p>Fatura ${fatura.cliente}\n</p>`;
//   faturaHTML += p;

//   faturaHTML += "<ul>";
//   for (let apre of fatura.apresentacoes) {
//     faturaHTML += `<li>${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>`;
//   }
//   faturaHTML += "</ul>";

//   faturaHTML += `<p>Valor total: ${formatarMoeda(calcularTotalFatura(fatura.apresentacoes))}</p>`;
//   faturaHTML += `<p>Créditos acumulados: ${calcularTotalCreditos(fatura.apresentacoes)}</p>`;

//   return faturaHTML;
// }








