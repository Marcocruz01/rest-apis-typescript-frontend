import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMesagge from "../components/ErrorMesagge";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params } : LoaderFunctionArgs) {
  if(params.id !== undefined) {
    const product = await getProductById(+params.id);
    if(!product) {
      throw new Response('', { status: 404, statusText: 'Producto no encontrado.'})
    }
    return product;
  }
}

// Definicion de la accion asociada al formulario 
export async function action({ request, params } : ActionFunctionArgs) {
  // Convertimos los datos enviados del formulario a un objeto plano 
  const data = Object.fromEntries(await request.formData());
  // Variable de error
  let error = '';
  // Verificamo si algun campo esta vacio 
  if(Object.values(data).includes('')) {
    // Mostramos el mesnaje 
    error = 'Todos los campos son obligatorios';
  }
  // Si hay errores, retornamos para mostrarlos en la vista 
  if(error.length) {
    return error
  }

  if(params.id !== undefined) {
    await updateProduct(data, +params.id);
    // Si no hay errores redireccionamos al usuario 
    return redirect('/');
  }
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]

// Definicion del componente
export default function EditProduct() {
  const product = useLoaderData() as Product;
  // Obtiene el mensaje retornado por la acción "Todos los campos son obligatorios"
  const error = useActionData() as string;
  
  return (
    <>
      <div className='flex flex-col md:flex-row items-center md:justify-between gap-4'>
        <h2 className='text-4xl font-black text-slate-500 text-center md:text-start'>Editar producto</h2>
        <Link
          to="/"
          className='w-full md:w-auto text-center rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500'
        >
          Regresar
        </Link>
      </div>
      {error && <ErrorMesagge>{error}</ErrorMesagge>}
      <Form
        className="mt-10"
        method="POST"
      >
        <ProductForm
          product={product}
        />
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar cambios"
        />
      </Form>
    </>
  )
}
