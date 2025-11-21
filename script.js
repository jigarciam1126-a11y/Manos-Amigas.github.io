// script.js - behavior for modal and form handling
document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  const f = e.target;
  const order = {
    name: f.name.value,
    phone: f.phone.value,
    address: f.address.value,
    location: f.location.value,
    type: f.type.value,
    items: f.items.value,
    payment: f.payment.value,
    timestamp: new Date().toISOString()
  };
  // create downloadable JSON file
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(order, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute('href', dataStr);
  dl.setAttribute('download', 'pedido_manos_amigas_' + Date.now() + '.json');
  dl.click();

  // open mail client with order summary
  const subject = encodeURIComponent('Nuevo pedido - Manos Amigas: ' + order.name);
  const body = encodeURIComponent(
    'Nombre: ' + order.name + '\n' +
    'Teléfono: ' + order.phone + '\n' +
    'Dirección: ' + order.address + '\n' +
    'Municipio/Depto: ' + order.location + '\n' +
    'Tipo: ' + order.type + '\n' +
    'Productos:\n' + order.items + '\n' +
    'Método de pago: ' + order.payment + '\n' +
    'Fecha: ' + order.timestamp
  );
  // Replace the email below with your team's email before publishing
  const mail = 'pedidos@manosamigas.sv';
  window.location.href = 'mailto:' + mail + '?subject=' + subject + '&body=' + body;
});

// Modal controls
function openModal(url){
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modalFrame');
  frame.src = url;
  modal.style.display = 'flex';
}
function closeModal(e){
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modalFrame');
  frame.src = '';
  modal.style.display = 'none';
  if(e) e.stopPropagation();
}
