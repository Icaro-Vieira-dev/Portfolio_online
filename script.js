// ===== Contato: e-mail =====
// O endereço fica separado em duas partes no HTML (data-usuario e data-dominio) e só é
// "montado" aqui. Robôs de spam que leem o HTML procurando "algo@algo" não o encontram.

const linkEmail = document.getElementById('link-email');
const botaoCopiar = document.getElementById('copiar-email');
const textoEmail = document.getElementById('texto-email');
const aviso = document.getElementById('aviso-copiado');

const email = linkEmail.dataset.usuario + '@' + linkEmail.dataset.dominio;

// o botão "E-mail" abre o programa de e-mail da pessoa
linkEmail.href = 'mailto:' + email;

// o botão de copiar só aparece com o script funcionando (no HTML ele começa "hidden")
textoEmail.textContent = email;
botaoCopiar.hidden = false;
botaoCopiar.setAttribute('aria-label', 'Copiar o e-mail ' + email);

botaoCopiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    mostrarAviso('E-mail copiado!');
  } catch {
    // alguns navegadores bloqueiam a área de transferência; nesse caso mostramos o e-mail
    mostrarAviso('Copie à mão: ' + email);
  }
});

let temporizador;
function mostrarAviso(mensagem) {
  aviso.textContent = mensagem;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => { aviso.textContent = ''; }, 2500);
}
