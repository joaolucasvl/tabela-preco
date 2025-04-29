import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXNj2v0uOQn0ZIJKhWLPzV06Nd71alelM",
  authDomain: "tabela-dados.firebaseapp.com",
  databaseURL: "https://tabela-dados-default-rtdb.firebaseio.com",
  projectId: "tabela-dados",
  storageBucket: "tabela-dados.firebasestorage.app",
  messagingSenderId: "1006252091868",
  appId: "1:1006252091868:web:5fd63bf73420d817d10719"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dadosRef = ref(db, "tabelaDados");

document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector(".rTable");
    let dadosTabela = {};

    // Carregar os dados do Firebase
    onValue(dadosRef, (snapshot) => {
        dadosTabela = snapshot.val() || {};
        
        tabela.querySelectorAll("tbody tr").forEach((tr, linhaIndex) => {
            tr.querySelectorAll("td").forEach((td, colunaIndex) => {
                let chave = `${linhaIndex}-${colunaIndex}`;
                td.innerText = dadosTabela[chave] || td.innerText;

                td.addEventListener("click", function () {
                    if (td.querySelector("input")) return;

                    let valorAntigo = td.innerText;
                    let input = document.createElement("input");
                    input.type = "text";
                    input.value = valorAntigo;
                    td.innerHTML = "";
                    td.appendChild(input);
                    input.focus();

                    function salvar(novoValor) {
                        td.innerText = novoValor;
                        dadosTabela[chave] = novoValor;
                        set(dadosRef, dadosTabela); // Salva no Firebase
                    }

                    input.addEventListener("blur", () => salvar(input.value || valorAntigo));
                    input.addEventListener("keypress", function (e) {
                        if (e.key === "Enter") salvar(input.value || valorAntigo);
                    });
                });
            });
        });
    });
});
