function handlePopOptionsClick(e){
  const [ popName, action ] = e.target.id.split('-');
  const button = e.target;

  map.pops.map(circle => {
    if(circle.options.name === popName && action === 'mark'){
      handleMarkPopButtonClick(button, circle);
    } else if(circle.options.name === popName && action === 'disable'){
      const markButton = button.previousElementSibling;
      handleDisabledPopButtonClick(markButton, button, circle);
    }
  })
}

function handleMarkPopButtonClick(button, circle){
  if(button.innerText === 'Marcar'){
    map.markedPops.push(circle);
    button.innerText = 'Desmarcar';
    circle.setStyle({ color: 'green', fillColor: "green" });
  } else {
    button.innerText = 'Marcar';
    circle.setStyle({ color: '#386377', fillColor: "#fff" });
  }
}

function handleDisabledPopButtonClick(markButton, disabledButton, circle){
  if(disabledButton.innerText === 'Desabilitar'){
    circle.setStyle({ color: 'red', fillColor: "red" });
    disabledButton.innerText = 'Habilitar';
    markButton.disabled = true;
    markButton.innerText = 'Marcar';
    markButton.classList.add('-disabled')
  } else {
    circle.setStyle({ color: '#386377', fillColor: "#fff" });
    markButton.disabled = false;
    markButton.classList.remove('-disabled')
    disabledButton.innerText = 'Desabilitar';
  }
}

export default handlePopOptionsClick;