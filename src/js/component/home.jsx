import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
    let [listaDeTareas, setListaDeTareas] = useState(["bañarse", "limpiar", "cocinar", "aprender react"])
    const [nuevaTarea, setNuevaTarea] = useState("")

    const crearUsuario = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Beli", {
                method: "POST",
                headers: { "Content-Type": "application/json" } // estamos creando
            })
            if (response.status == 201) {
                obtenerTareas()
                return true
            }
        } catch (error) {
            console.log(error); //atrapamos los errores 1
            return false

        }
    }

    const obtenerTareas = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Beli", {
                method: "GET",
                headers: { "Content-Type": "application/json" } // estamos creando
            })
            if (response.status == 404) {
                crearUsuario()
                return true
            }
            const data = await response.json()
            setListaDeTareas(data.todos)

        } catch (error) {
            console.log(error); //atrapamos los errores
            return false

        }
    }

    const agregarTarea = async (evento) => {
        evento.preventDefault()
        if (nuevaTarea.trim() !== "") {
            // setListaDeTareas([...listaDeTareas, nuevaTarea])
            try {
                const response = await fetch("https://playground.4geeks.com/todo/todos/Beli", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }, // estamos creando
                    body: JSON.stringify({
                        "label": nuevaTarea,
                        "is_done": false
                    })
                })
                if (response.status == 201) {
                    obtenerTareas()
                    setNuevaTarea("")
                    return true
                }
            } catch (error) {
                console.log(error); //atrapamos los errores 1
                return false

            }
            
        }
    }

    const eventoEnter = (evento) => {
        if (evento.key === "Enter") {
            agregarTarea(evento)
        }
    }

    const borrarTarea = async (evento, index) => {
        evento.preventDefault()
    //     let listaFiltrada = listaDeTareas.filter((task, i) => {
    //         return (i != index)
    //     })
    //     setListaDeTareas(listaFiltrada)
    try {
        const response = await fetch("https://playground.4geeks.com/todo/todos/"+index, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" } // estamos creando
        })
        if (response.status == 204) {
            obtenerTareas()
            return true
        }
    } catch (error) {
        console.log(error); //atrapamos los errores 1
        return false

    }
    }

    useEffect(() => {
        obtenerTareas()
    }, [])

    return (
        <div className="container mt-5">
            <h1 className="text-center mt-5">Todos</h1>

            <div className="mx-auto col-6">
                <input type="text"
                    className="form-control"
                    placeholder="¿Que Necesitas Hacer?"
                    value={nuevaTarea}
                    onChange={(evento) => setNuevaTarea(evento.target.value)}
                    onKeyDown={eventoEnter}
                />

                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-success mt-3 mb-3 w-50"
                        onClick={(evento) => agregarTarea(evento)}>
                        Agregar Tarea
                    </button>
                </div> */}

                <ul className="list-group">
                    {listaDeTareas.map((item, index) => {
                        return (
                            <li className="list-group-item" key={index}>
                                {item.label}  <i className="fa fa-trash icono-oculto float-end fs-4"
                                    onClick={(evento) => borrarTarea(evento, item.id)}>
                                </i>
                            </li>
                        )
                    })}

                </ul>


            </div>
            <p className="text-center">{listaDeTareas.length} Tareas pendientes</p>
        </div>

    );
};

export default Home;