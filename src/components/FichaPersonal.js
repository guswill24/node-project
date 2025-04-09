import React from "react";

export default function FichaPersonal({ person }) {
    if (!person) return <p>No hay informacion para mostrar.</p>

    return (
        <div className="ficha">
            <h2>Ficha de {person.name.first} {person.name.last}</h2>
            <p>Email: {person.email}</p>
            <p>Pais: {person.location.country}</p>
            <p>Telefono: {person.phone}</p>
            <img src={person.picture.large} alt="Foto de perfil" />
        </div>
    );
}