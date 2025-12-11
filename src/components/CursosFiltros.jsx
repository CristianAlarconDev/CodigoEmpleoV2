import React from 'react';

const CursosFiltros = ({ filtrosSeleccionados, onFiltroChange }) => {

    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const selectClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white";

    return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Filtros</h3>
      
      <div className="space-y-4">
        {/* filtro seniority */}
        <div>
          <label className={labelClass}>Nivel / Seniority</label>
          <select 
            name="seniority"
            value={filtrosSeleccionados.seniority}
            onChange={onFiltroChange}
            className={selectClass}
          >
            <option value="">Todos</option>
            <option value="Trainee">Principiante (Trainee)</option>
            <option value="Junior">Junior</option>
            <option value="Semi Senior">Intermedio (Semi Senior)</option>
            <option value="Senior">Avanzado (Senior)</option>
          </select>
        </div>

        {/* filtro modalidad */}
        <div>
          <label className={labelClass}>Modalidad</label>
          <select 
            name="modalidad"
            value={filtrosSeleccionados.modalidad}
            onChange={onFiltroChange}
            className={selectClass}
          >
            <option value="">Todas</option>
            <option value="Sincrónico">Sincrónico (En vivo)</option>
            <option value="Asincrónico">Asincrónico (Grabado)</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default CursosFiltros;