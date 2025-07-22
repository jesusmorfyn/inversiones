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

                // Creamos las celdas (td) y las llenamos con los datos
                fila.innerHTML = `
                    <td>
                        <img src="${inversion.logo}" alt="Logo ${inversion.institucion}" width="20" style="margin-right: 8px; vertical-align: middle;">
                        ${inversion.institucion}
                    </td>
                    <td>${inversion.producto}</td>
                    <td>${inversion.plazo_texto}</td>
                    <td><strong>${inversion.tasa_anual.toFixed(2)}%</strong></td>
                    <td>$${inversion.monto_minimo.toLocaleString('es-MX')}</td>
                    <td><a href="${inversion.url_oferta}" target="_blank" class="btn-visitar">Visitar Sitio</a></td>
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