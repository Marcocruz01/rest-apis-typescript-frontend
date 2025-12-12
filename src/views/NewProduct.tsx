import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMesagge from "../components/ErrorMesagge";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// Definicion de la accion asociada al formulario 
export async function action({ request } : ActionFunctionArgs) {
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

  await addProduct(data);
  // Si no hay errores redireccionamos al usuario 
  return redirect('/');
}

// Definicion del componente
export default function NewProduct() {
  // Obtiene el mensaje retornado por la acción "Todos los campos son obligatorios"
  const error = useActionData() as string;
  return (
    <>
      <div className='flex flex-col md:flex-row items-center md:justify-between gap-4'>
        <h2 className='text-4xl font-black text-slate-500 text-center md:text-start'>Registrar producto</h2>
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

        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
