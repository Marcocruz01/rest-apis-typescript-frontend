import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, { loader as productsLoader, action as updateAvailabilityAction} from './views/Products';
import NewProduct, { action as newProductAction} from './views/NewProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';

// Definicion del router principal con todas las rutas de la app
export const router = createBrowserRouter([
    {
        path: '/',                          // Ruta base
        element: <Layout/>,                 // Layout que envuelve las rutas hijos
        children: [
            {
                index: true,                // Ruta por defecto: muestra Products al entrar a '/'
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',    // Ruta para crear nuevos productos
                element: <NewProduct/>,     // Componente para el formulario  
                action: newProductAction,   // Acción que maneja el submit del formulario
            },
            {
                path: 'productos/:id/editar', // ROA Pattern - editar producto
                element: <EditProduct/>,
                loader: editProductLoader,  // Accion para manejar la edicion 
                action: editProductAction,
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
]);