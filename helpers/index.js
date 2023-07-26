export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const formatearFecha = fecha =>{

    let fechaFormato = new Date(Number(fecha));

    let mes = fechaFormato.getMonth()+1;
    let year = fechaFormato.getFullYear();
    let dia = fechaFormato.getDate();
    let hora = fechaFormato.getHours();
    let minuto = fechaFormato.getMinutes();

    let fechacompleta = `${dia}/${mes}/${year} ${hora}:${minuto}`;
    return fechacompleta;
};

export const formatearSoloFecha = fecha =>{

    let fechaFormato = new Date(Number(fecha));

    let mes = fechaFormato.getMonth()+1;
    let year = fechaFormato.getFullYear();
    let dia = fechaFormato.getDate();

    let fechacompleta = `${dia}/${mes}/${year}`;
    return fechacompleta;
};