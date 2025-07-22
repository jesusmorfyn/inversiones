document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.getElementById('tabla-inversiones');
    const selectorOrden = document.getElementById('ordenar-por');
    let datosInversiones = []; // Variable para guardar los datos originales

    // Función para dibujar/renderizar la tabla
    function renderizarTabla(datos) {
        tablaBody.innerHTML = ''; // Limpiar la tabla antes de dibujar
        datos.forEach(inversion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td data-label="Institución">
                    <img src="${inversion.logo}" alt="Logo ${inversion.institucion}" width="20" style="margin-right: 8px; vertical-align: middle;">
                    ${inversion.institucion}
                </td>
                <td data-label="Producto">${inversion.producto}</td>
                <td data-label="Plazo">${inversion.plazo_texto}</td>
                <td data-label="Tasa Anual"><strong>${inversion.tasa_anual.toFixed(2)}%</strong></td>
                <td data-label="Monto Mínimo">$${inversion.monto_minimo.toLocaleString('es-MX')}</td>
                <td data-label="Acción"><a href="${inversion.url_oferta}" target="_blank" class="btn-visitar">Visitar Sitio</a></td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    // Función para ordenar los datos
    function ordenarDatos() {
        const criterio = selectorOrden.value;
        let datosOrdenados = [...datosInversiones]; // Crear una copia para no modificar el original

        switch (criterio) {
            case 'tasa_desc':
                datosOrdenados.sort((a, b) => b.tasa_anual - a.tasa_anual);
                break;
            case 'tasa_asc':
                datosOrdenados.sort((a, b) => a.tasa_anual - b.tasa_anual);
                break;
            case 'monto_asc':
                datosOrdenados.sort((a, b) => a.monto_minimo - b.monto_minimo);
                break;
            case 'plazo_asc':
                datosOrdenados.sort((a, b) => a.plazo_dias - b.plazo_dias);
                break;
        }
        renderizarTabla(datosOrdenados);
    }

    // Cargar los datos iniciales
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            datosInversiones = data;
            ordenarDatos(); // Ordenar y mostrar por primera vez (usando el valor por defecto del select)
        })
        .catch(error => {
            console.error('Error al cargar los datos de inversión:', error);
            tablaBody.innerHTML = '<tr><td colspan="6">No se pudo cargar la información. Intenta de nuevo más tarde.</td></tr>';
        });
    
    // Añadir el listener para cuando el usuario cambie la opción de orden
    selectorOrden.addEventListener('change', ordenarDatos);
});