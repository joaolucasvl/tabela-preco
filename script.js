document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector(".rTable");
    let dadosTabela = JSON.parse(localStorage.getItem("tabelaDados")) || {};

    // Carregar os dados salvos
    tabela.querySelectorAll("tbody tr").forEach((tr, linhaIndex) => {
        tr.querySelectorAll("td").forEach((td, colunaIndex) => {
            let chave = `${linhaIndex}-${colunaIndex}`;
            if (dadosTabela[chave]) {
                td.innerText = dadosTabela[chave];
            }
            
            td.addEventListener("click", function () {
                let valorAntigo = this.innerText;
                let input = document.createElement("input");
                input.type = "text";
                input.value = valorAntigo;
                this.innerHTML = "";
                this.appendChild(input);
                input.focus();

                input.addEventListener("blur", function () {
                    let novoValor = this.value || valorAntigo;
                    td.innerText = novoValor;
                    dadosTabela[chave] = novoValor;
                    localStorage.setItem("tabelaDados", JSON.stringify(dadosTabela));
                });

                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        let novoValor = this.value || valorAntigo;
                        td.innerText = novoValor;
                        dadosTabela[chave] = novoValor;
                        localStorage.setItem("tabelaDados", JSON.stringify(dadosTabela));
                    }
                });
            });
        });
    });
});
