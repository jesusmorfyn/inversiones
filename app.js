document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.getElementById('tabla-inversiones');

    // Usamos fetch para cargar el archivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Limpiamos la tabla por si acaso
            tablaBody.innerHTML = '';

            // Recorremos cada inversión en nuestro archivo JSON
            data.forEach(inversion => {
                // Creamos una nueva fila (tr)
                const fila = document.createElement('tr');

                // ESTA ES LA PARTE QUE CAMBIA
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

                // Añadimos la fila completa a la tabla
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos de inversión:', error);
            tablaBody.innerHTML = '<tr><td colspan="6">No se pudo cargar la información. Intenta de nuevo más tarde.</td></tr>';
        });
});