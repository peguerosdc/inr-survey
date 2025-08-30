export function InstructionsForm({
  handleSubmit,
  children,
}: {
  handleSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <h2>Instrucciones</h2>
      <p>
        A continuación encontrará diversas preguntas sobre hábitos sedentarios
        que se realizan ENTRE SEMANA y FIN DE SEMANA. Reporte el tiempo
        considerando las horas y minutos empleados, por ejemplo: 2 h 0 min, 1 h
        30 min, 0 h 45 min, 0 h 0 min.
      </p>
      {children}
    </form>
  );
}
