let contas = [];
let iEdicao = 0;
//montarTabela();

function novo() {
    document.getElementById("manipulacao").innerHTML += `
        <input type="text" id="descricao" placeholder="Descrição da conta">
        <input type="number" id="valor" placeholder="Valor">
        <input type="radio" id="receita" name="tipo" value="Receita"><label for="receita">Receita</label>
        <input type="radio" id="despesa" name="tipo" value="Despesa"><label for="receita">Despesa</label>
        <input type="checkbox" id="contaPaga">Paga<br>
        <input type="date" id="dataVenc" placeholder="Data vencimento">
        <select id="categoria">
            <option value="Selecione uma categoria" disabled selected>Selecione uma categoria</option>
            <option value="Imposto">Imposto</option>
            <option value="Transporte">Transporte</option>
            <option value="Residência">Residência</option><br>
            <option value="Alimentação">Alimentação</option>
            <option value="Remuneração">Remuneração</option>
        </select>
        <button type="button" onclick="salvar()">Salvar💾</button>
        <button type="button" onclick="cancelar()">Cancelar🔙</button>
    `
    document.getElementById("botaoNovo").innerHTML = ""
}
function cancelar() {
    document.getElementById("manipulacao").innerHTML = ""
    document.getElementById("botaoNovo").innerHTML = `
    <button type="button" onclick="novo()">Nova Conta🆕</button>
    `
}
function salvar() {
    let idAux;
    let statusAux;
    let valorTipo;
    if (contas.length === 0) {
        idAux = 1;
    } else {
        idAux = contas[contas.length - 1].id + 1;
    }
    if (document.getElementById("contaPaga").checked) {
        statusAux = "Paga";
    } else {
        statusAux = "Em aberto";
    }
    if (document.querySelector("input[name='tipo']:checked").value === "Despesa") {
        valorTipo = Number("-" + document.getElementById("valor").value);
    } else {
        valorTipo = document.getElementById("valor").value;
    }
    contas.push({
        id: idAux,
        descricao: document.getElementById("descricao").value,
        valor: valorTipo,
        tipo: document.querySelector("input[name='tipo']:checked").value,
        status: statusAux,
        dtVenc: document.getElementById("dataVenc").value,
        categoria: document.getElementById("categoria").value
    })
    localStorage.setItem('contasCadastradas', JSON.stringify(contas));
    console.log(contas);
    montarTabela();
}

function montarTabela() {
    document.getElementById("saldo").innerText = "";
    contas = JSON.parse(localStorage.getItem('contasCadastradas'));
    let saldo = 0;
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    if (contas.length > 0) {
        for (let i = 0; i < contas.length; i++) {
            saldo += Number(contas[i].valor);
            tabela.innerHTML +=
                `
            <tr>
                <td>${contas[i].id}</td>
                <td>${contas[i].descricao}</td>
                <td>R$ ${contas[i].valor}</td>
                <td>${contas[i].tipo}</td>
                <td>${contas[i].dtVenc}</td>
                <td>${contas[i].status}</td>
                <td><button class="miniBotao" style="cursor: pointer"; onclick="editarConta(${i})">📝</button>
                <button class="miniBotao" style="cursor: pointer"; onclick="excluirConta(${i})">❌</button></td>
            </tr>
        `;
            document.getElementById("manipulacao").innerHTML = ""
            document.getElementById("botaoNovo").innerHTML = `
        <button type="button" onclick="novo()">Nova Conta🆕</button>
        `
            console.log("Impresso");
        }
        document.getElementById("saldo").innerText = saldo;
    }
}
function excluirConta(indice) {
    const desejaExcluir = confirm('Tem certeza que deseja excluir ' + contas[indice].descricao + ' da lista?');
    if (desejaExcluir) {
        contas.splice(indice, 1);
        localStorage.setItem('contasCadastradas', JSON.stringify(contas));
        montarTabela();
    }
}
function editarConta(indice) {
    const desejaEditar = confirm('Tem certeza que deseja editar a conta ' + contas[indice].descricao + '?');
    if (desejaEditar) {
        if (contas[indice].valor<0){
            contas[indice].valor = contas[indice].valor * -1;
        }
        document.getElementById("manipulacao").innerHTML += `
        <input type="text" id="descricao" placeholder="Descrição da conta">
        <input type="number" id="valor" placeholder="Valor">
        <input type="radio" id="receita" name="tipo" value="Receita"><label for="receita">Receita</label>
        <input type="radio" id="despesa" name="tipo" value="Despesa"><label for="receita">Despesa</label>
        <input type="checkbox" id="contaPaga">Paga<br>
        <input type="date" id="dataVenc" placeholder="Data vencimento">
        <select id="categoria">
            <option value="Selecione uma categoria" disabled selected>Selecione uma categoria</option>
            <option value="Imposto">Imposto</option>
            <option value="Transporte">Transporte</option>
            <option value="Residência">Residência</option><br>
            <option value="Alimentação">Alimentação</option>
            <option value="Remuneração">Remuneração</option>
        </select>
        <button type="button" onclick="salvarEdicao()">Salvar💾</button>
        <button type="button" onclick="cancelar()">Cancelar🔙</button>
    `
        document.getElementById("descricao").value = contas[indice].descricao;
        document.getElementById("valor").value = contas[indice].valor;
        if (contas[indice].tipo === "Receita") {
            document.getElementById("receita").checked = true;
        } else {
            document.getElementById("despesa").checked = true;
        }
        if (contas[indice].status === "Paga") {
            document.getElementById("contaPaga").checked = true;
        }
        document.getElementById("dataVenc").value = contas[indice].dtVenc;
        document.getElementById("categoria").value = contas[indice].categoria;
        iEdicao = indice;
    }
}
function salvarEdicao() {
    if (document.getElementById("contaPaga").checked) {
        statusAux = "Paga";
    } else {
        statusAux = "Em aberto";
    }
    if (document.querySelector("input[name='tipo']:checked").value === "Despesa") {
        valorTipo = Number("-" + document.getElementById("valor").value);
    } else {
        valorTipo = document.getElementById("valor").value;
    }
    contas[iEdicao].descricao = document.getElementById("descricao").value;
    contas[iEdicao].valor = valorTipo;
    contas[iEdicao].tipo = document.querySelector("input[name='tipo']:checked").value;
    contas[iEdicao].status = statusAux;
    contas[iEdicao].dtVenc = document.getElementById("dataVenc").value;
    contas[iEdicao].categoria = document.getElementById("categoria").value;
    localStorage.setItem('contasCadastradas', JSON.stringify(contas));
    document.getElementById("manipulacao").innerHTML = "";
    document.getElementById("botaoNovo").innerHTML = `
<button type="button" onclick="novo()">Nova Conta🆕</button>
`;
    montarTabela();
}