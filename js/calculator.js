const bunnyExpressions = [
    '(")_(")\n(=^.^=)\n(")_(")',
    '(")_(")\n(=O.o=)\n(")_(")',
    '(")_(")\n(=@.@=)\n(")_(")',
    '(")_(")\n(=^_^=)\n(")_(")',
    '(")_(")\n(=0.0=)\n(")_(")'
];

const angryBunny = '(")_(")\n(=ò.ó=)\n(")_(")';
let currentExpression = 0;

const bunny = document.getElementById('bunny');
const bunnyMessage = document.getElementById('bunnyMessage');
const bunnyContainer = document.getElementById('bunnyContainer');
let isHovering = false;
let leaveTimeout;

// Eventos para el hover del contenedor completo
bunnyContainer.addEventListener('mouseenter', function() {
    // Limpiar timeout si existe
    if (leaveTimeout) {
        clearTimeout(leaveTimeout);
    }
    
    isHovering = true;
    bunny.textContent = angryBunny;
    bunnyMessage.textContent = '¡No me toques o te maldigo!!';
    bunnyMessage.classList.add('show');
});

bunnyContainer.addEventListener('mouseleave', function() {
    isHovering = false;
    
    // Agregar delay antes de cambiar el conejo
    leaveTimeout = setTimeout(() => {
        if (!isHovering) {
            bunny.textContent = bunnyExpressions[currentExpression];
            bunnyMessage.classList.remove('show');
        }
    }, 100);
});

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const op = document.getElementById('operation').value;
    let res = '';
    
    if (op === 'sum') res = num1 + num2;
    else if (op === 'sub') res = num1 - num2;
    else if (op === 'mul') res = num1 * num2;
    else if (op === 'div') {
        if (num2 === 0) res = 'No se puede dividir por cero';
        else res = num1 / num2;
    }
    
    document.getElementById('result').textContent = 'Resultado: ' + res;
    
    // Cambiar expresión del conejo
    currentExpression = (currentExpression + 1) % bunnyExpressions.length;
    if (!isHovering) {
        bunny.textContent = bunnyExpressions[currentExpression];
    }
});
