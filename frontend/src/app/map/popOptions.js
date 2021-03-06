function createPopOptions(firstButtonText, secondButtonText, name, onClickPopOption){
  const firstButton = createButton(firstButtonText, name + '-mark', onClickPopOption);
  const secondButton = createButton(secondButtonText, name + '-disable', onClickPopOption);
  const divElement = document.createElement('div');
  divElement.appendChild(firstButton);
  divElement.appendChild(secondButton);
  return divElement;
}

function createButton(buttonText, id, onClickPopOption){
  const button = document.createElement('button');
  const text = document.createTextNode(buttonText);
  button.appendChild(text);
  button.setAttribute('id', id);
  button.addEventListener('click', onClickPopOption);
  button.style.setProperty('background-color', '#386377');
  button.style.setProperty('border-radius', '0.125rem');
  button.style.setProperty('cursor', 'pointer');
  button.style.setProperty('color', 'white');
  button.style.setProperty('border', '0');
  button.style.setProperty('padding', '0 0.25rem');
  button.style.setProperty('margin', '0.25rem');
  button.style.setProperty('height', '2rem');
  button.style.setProperty('width', '5rem');
  return button;
}

export default createPopOptions;