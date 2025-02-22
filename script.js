document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", function () {
            let valorAntigo = this.innerText;
            let input = document.createElement("input");
            input.type = "text";
            input.value = valorAntigo;
            this.innerHTML = "";
            this.appendChild(input);
            input.focus();

            // Salvar alteração ao sair do campo ou pressionar Enter
            input.addEventListener("blur", function () {
                td.innerText = this.value || valorAntigo;
            });

            input.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    td.innerText = this.value || valorAntigo;
                }
            });
        });
    });
});
