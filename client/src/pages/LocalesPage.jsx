import React, { useEffect } from 'react';
import MyTable from '../components/TableStore';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';


function LocalesPage() {
    const { getStoreTable, stores } = useStore();

    //console.log(stores)

    useEffect(() => {
        getStoreTable();
    }, []);

    return (
        <div><br />
            <Link to="/admin/add-store" className="inline-block bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg mb-4">
                Agregar Comercio
            </Link>
            <MyTable data={stores} />
            
        </div>
    );
}

export default LocalesPage;