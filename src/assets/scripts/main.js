/**
 * Import dependencies from node_modules
 * see commented examples below
 */
import * as bootstrap from 'bootstrap';
// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */
//Script upcycling drag and drop

document.addEventListener('DOMContentLoaded', function () {
  const dropTarget = document.getElementById('drop-target');
  
  // Mensaje que se muestra en páginas donde no exista el id 'drop-target'
  if (!dropTarget) {
    console.log('Juego de reciclaje de ropa not available in this page.');
    return;
  }

  const clothes = document.querySelectorAll('.clothing-item');
  const successMessage = document.getElementById('success-message');
  let draggedItem = null;

  clothes.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('touchstart', touchStart);
  });

  dropTarget.addEventListener('dragover', dragOver);
  dropTarget.addEventListener('drop', dropItem);
  dropTarget.addEventListener('touchmove', touchMove);
  dropTarget.addEventListener('touchend', touchEnd);

  function dragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text', e.target.id);
  }

  //Soltar la imagen
  function dragOver(e) {
    e.preventDefault(); 
  }

  function dropItem(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    draggedItem = document.getElementById(data);
    dropTarget.appendChild(draggedItem);
    draggedItem.style.position = 'absolute';
    draggedItem.style.top = '50%';
    draggedItem.style.left = '50%';
    draggedItem.style.transform = 'translate(-50%, -50%)';
     // Deshabilitar drag cuando se suelta la imagen
    draggedItem.setAttribute('draggable', 'false'); 

    // Mensaje de éxito
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 800);

    // Imagen desaparece
    setTimeout(() => {
      draggedItem.style.display = 'none';
    }, 500);
  }

  // Versión touch para móviles/tabletas
  function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    draggedItem = e.target;
    

  }

  function touchMove(e) {
    e.preventDefault();
    if (draggedItem) {
      const touch = e.touches[0];
      draggedItem.style.position = 'absolute';
      draggedItem.style.top = `${touch.clientY - draggedItem.offsetHeight / 2}px`;
      draggedItem.style.left = `${touch.clientX - draggedItem.offsetWidth / 2}px`;
    }
  }

  function touchEnd(e) {
    e.preventDefault();
    if (draggedItem) {
      dropItem(e); 
    }
  }
});