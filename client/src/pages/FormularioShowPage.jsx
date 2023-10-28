import React, { useEffect } from 'react';
import MyTable from '../components/Table';
import ExportButtons from '../components/ExportButtons';
import { useForms } from '../context/FormContext';

function FormularioShowPage() {
    const { getForms, forms } = useForms();

    //console.log(forms)

    useEffect(() => {
        getForms();
    }, []);

    return (
        <div><br />
            <ExportButtons data={forms} /> <br /> <br />
            <MyTable data={forms} />
            
        </div>
    );
}

export default FormularioShowPage;