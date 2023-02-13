const c = (el) => document.querySelector(`${el}`);

//variaveis de controle de interface
let seuVotoPara = c(`.d-1-1 span`);

let cargo = c(`.d-1-2 span`);

let descricao = c(`.d-1-4`);

let numeros = c(`.d-1-3`);

let aviso = c(`.d-2`);

let lateral = c(`.d-1--right`);

//variaveis de controle de ambiente
let etapaAtual = 0;
let numero = ``;
let numeroCount = 0;
let votoBranco = false;
let votos = [];

const comecarEtapa = () => {
  numero = ``;
  votoBranco = false;

  let etapa = etapas[etapaAtual];

  let seuVotoPara = (c(`.d-1-1 span`).style.display = `none`);

  let numeroHtml = ``;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += `<div class="numero pisca"></div>`;
    } else {
      numeroHtml += `<div class="numero"></div>`;
    }
  }

  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = ``;
  aviso.style.display = `none`;
  lateral.innerHTML = ``;
  numeros.innerHTML = numeroHtml;
};

etapas.forEach((etapa, index) => {});

//funcoes e eventos dos botoes
const atualizaInterface = () => {
  console.log(`atualizando interface`);
  let etapa = etapas[etapaAtual];
  //pegando o candidato se existir
  let canditato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if (canditato.length > 0) {
    canditato = canditato[0];
    seuVotoPara.style.display = `block`;
    aviso.style.display = `block`;

    descricao.innerHTML = `Nome: ${canditato.nome} <br>
    Partido: ${canditato.partido} <br>`;

    let fotosHtml = ``;
    for (let i in canditato.fotos) {
      if (canditato.fotos[i].small) {
        fotosHtml += ` <div class="d-1-image small">
                      <img src="images/${canditato.fotos[i].url}" alt="${canditato.fotos[i].legenda}">
                      ${canditato.fotos[i].legenda}
                    </div>`;
      } else {
        fotosHtml += ` <div class="d-1-image">
                      <img src="images/${canditato.fotos[i].url}" alt="${canditato.fotos[i].legenda}">
                      ${canditato.fotos[i].legenda}
                    </div>`;
      }
    }
    lateral.innerHTML = fotosHtml;

    if (etapa.titulo === `PREFEITO`) {
      descricao.innerHTML += `Vice-Prefeito: ${canditato.vice}`;
    }
  } else {
    seuVotoPara.style.display = `block`;
    aviso.style.display = `block`;

    descricao.innerHTML = `<div                   class="aviso--grande pisca">
                          VOTO NULO
                          </div>`;
  }
  console.log(canditato);
};

const clicou = (valor) => {
  let elNumero = c(`.numero.pisca`);
  if (elNumero !== null) {
    elNumero.innerHTML = valor;
    numero = `${numero}${valor}`;
    elNumero.classList.remove(`pisca`);
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add(`pisca`);
    } else {
      atualizaInterface();
    }
  }
};

const branco = () => {
  numero = ``;
  votoBranco = true;
  seuVotoPara.style.display = `block`;
  aviso.style.display = `block`;
  numeros.innerHTML = ``;
  descricao.innerHTML = `<div                   class="aviso--grande pisca">
                           VOTO EM BRANCO
                          </div>`;
  lateral.innerHTML = ``;
};

const corrige = () => {
  comecarEtapa();
};

const confirma = () => {
  let etapa = etapas[etapaAtual];

  let canditato = etapa.numeros === numero.length ? true : false;
  let votoConfirmado = false;
  if (canditato) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero,
    });
  } else if (votoBranco) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: `branco`,
    });
  } else {
    numeros.innerHTML = ``;
    cargo.innerHTML = ``;
    descricao.innerHTML = `<div                   class="aviso--grande pisca">
                           FAVOR ESCOLHA UM TIPO DE VOTO
                          </div>`;
    lateral.innerHTML = ``;
  }

  if (votoConfirmado) {
    etapaAtual++;

    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      c(
        `.tela`
      ).innerHTML = `<div                   class="aviso--gigante pisca">
      FIM
     </div>`;
    }
  }
};

comecarEtapa();
