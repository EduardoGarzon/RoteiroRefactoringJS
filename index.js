const { readFileSync } = require('fs');

var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js");
var gerarFaturaStr = require("./apresentacao.js");

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

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);

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








